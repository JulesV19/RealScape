export async function exportTer(terrainData) {
  const { width, height, heightMap, minHeight, maxHeight } = terrainData;
  
  // BeamNG terrains are expected to be square. If not, clip to the minimum dimension.
  const size = Math.min(width, height);
  const materialName = "DefaultMaterial";
  
  const encoder = new TextEncoder();
  const materialBytes = encoder.encode(materialName);
  const materialNameLen = materialBytes.length;
  
  let materialNameHeaderSize = 1;
  if (materialNameLen >= 255) {
    materialNameHeaderSize = 3;
  }
  
  const headerSize = 5;
  const heightmapSize = size * size * 2;
  const layerMapSize = size * size;
  const materialListHeaderSize = 4;
  
  const totalSize = headerSize + heightmapSize + layerMapSize + materialListHeaderSize + materialNameHeaderSize + materialNameLen;
  
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  
  let offset = 0;
  
  // 1. Header
  view.setUint8(offset, 0x09);
  offset += 1;
  view.setUint32(offset, size, true);
  offset += 4;
  
  // 2. Heightmap Data
  // Requirements: Row-major, first value is bottom-left. 
  // TerrainData heightMap has first value at top-left.
  // We need to reverse the Y order.
  const range = maxHeight - minHeight;
  for (let y = size - 1; y >= 0; y--) {
    for (let x = 0; x < size; x++) {
      const srcIdx = y * width + x;
      const h = heightMap[srcIdx];
      let val = 0;
      if (range > 0) {
        val = Math.floor(((h - minHeight) / range) * 65535);
      }
      val = Math.max(0, Math.min(65535, val));
      view.setUint16(offset, val, true);
      offset += 2;
    }
  }
  
  // 3. Layer Map (Indices for material, default 0)
  const layerMapView = new Uint8Array(buffer, offset, layerMapSize);
  layerMapView.fill(0);
  offset += layerMapSize;
  
  // 4. Layer Texture Data (Deprecated, omitted)
  
  // 5. Material Names
  view.setUint32(offset, 1, true); // 1 material
  offset += 4;
  
  if (materialNameLen < 255) {
    view.setUint8(offset, materialNameLen);
    offset += 1;
  } else {
    view.setUint8(offset, 0xFF);
    offset += 1;
    view.setUint16(offset, materialNameLen, true);
    offset += 2;
  }
  
  const stringView = new Uint8Array(buffer, offset, materialNameLen);
  stringView.set(materialBytes);
  offset += materialNameLen;
  
  return { 
    blob: new Blob([buffer], { type: 'application/octet-stream' }),
    filename: `terrain.ter`
  };
}
