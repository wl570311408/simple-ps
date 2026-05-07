<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <LayoutGrid class="w-6 h-6 text-blue-600" />
          <h1 class="text-xl font-bold text-gray-800">小学生小报排版工具</h1>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="addImage"
            class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ImagePlus class="w-5 h-5" />
            <span>图片</span>
          </button>
          <button
            @click="addText"
            class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Type class="w-5 h-5" />
            <span>文字</span>
          </button>
          <div class="relative">
            <button
              @click="toggleMenu('shape')"
              class="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Triangle class="w-5 h-5" />
              <span>形状</span>
            </button>
            <div v-if="showShapeMenu" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-2 gap-1 min-w-[160px]">
            <button
              @click="addShape('rectangle'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Square class="w-4 h-4" />
              <span>矩形</span>
            </button>
            <button
              @click="addShape('circle'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Circle class="w-4 h-4" />
              <span>圆形</span>
            </button>
            <button
              @click="addShape('ellipse'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Circle class="w-4 h-4" />
              <span>椭圆</span>
            </button>
            <button
              @click="addShape('triangle'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Triangle class="w-4 h-4" />
              <span>三角形</span>
            </button>
            <button
              @click="addShape('diamond'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Hexagon class="w-4 h-4" />
              <span>菱形</span>
            </button>
            <button
              @click="addShape('star'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Star class="w-4 h-4" />
              <span>星形</span>
            </button>
            <button
              @click="addShape('heart'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Heart class="w-4 h-4" />
              <span>心形</span>
            </button>
            <button
              @click="addShape('arrow'); showShapeMenu = false"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <ArrowRight class="w-4 h-4" />
              <span>箭头</span>
            </button>
            </div>
          </div>
          <div class="relative">
            <button
              @click="toggleMenu('icon')"
              class="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Star class="w-5 h-5" />
              <span>图标</span>
            </button>
            <div v-if="showIconMenu" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-4 gap-1 min-w-[200px]">
              <button v-for="icon in iconList" :key="icon.name"
                @click="addIcon(icon.name); showIconMenu = false"
                class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs"
              >
                <component :is="icon.component" class="w-5 h-5" />
                <span>{{ icon.label }}</span>
              </button>
            </div>
          </div>
          <div class="relative">
            <button
              @click="toggleMenu('sticker')"
              class="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <Heart class="w-5 h-5" />
              <span>贴纸</span>
            </button>
            <div v-if="showStickerMenu" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-4 gap-1 min-w-[200px]">
              <button v-for="sticker in stickerList" :key="sticker.name"
                @click="addSticker(sticker); showStickerMenu = false"
                class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs"
              >
                <span class="text-2xl">{{ sticker.emoji }}</span>
                <span>{{ sticker.label }}</span>
              </button>
            </div>
          </div>
          <div class="relative">
            <button
              @click="toggleMenu('other')"
              class="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <MoreHorizontal class="w-5 h-5" />
              <span>其他</span>
            </button>
            <div v-if="showOtherMenu" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-2 gap-1 min-w-[160px]">
              <button
                @click="addBorder({ name: 'solid', style: 'solid', color: '#333333', radius: 4 }); showOtherMenu = false"
                class="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded text-xs"
              >
                <Square class="w-5 h-5" />
                <span>边框</span>
              </button>
              <button
                @click="addTable(); showOtherMenu = false"
                class="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded text-xs"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                  <line x1="15" y1="3" x2="15" y2="21"/>
                </svg>
                <span>表格</span>
              </button>
            </div>
          </div>
          <button
            @click="exportImage"
            class="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Download class="w-5 h-5" />
            <span>导出</span>
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <aside class="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-4">
        <div class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Layers class="w-5 h-5" />
            图层管理
          </h3>
          <div v-if="elements.length === 0" class="text-gray-400 text-sm">
            暂无元素，请图片或文字
          </div>
          <div v-else class="space-y-2 max-h-80 overflow-y-auto">
            <div
              v-for="(element, index) in sortedElements"
              :key="element.id"
              @click="selectElement(element)"
              :class="[
                'flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors',
                selectedElement?.id === element.id
                  ? 'bg-blue-50 border border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              ]"
            >
              <ImageIcon v-if="element.type === 'image'" :size="20" class="text-gray-600" />
              <Type v-else-if="element.type === 'text'" class="w-5 h-5 text-gray-600" />
              <Triangle v-else-if="element.type === 'shape'" class="w-5 h-5 text-gray-600" :style="{ color: element.color }" />
              <Star v-else-if="element.type === 'icon'" class="w-5 h-5 text-gray-600" />
              <Heart v-else-if="element.type === 'sticker'" class="w-5 h-5 text-pink-500" />
              <Square v-else-if="element.type === 'border'" class="w-5 h-5 text-teal-500" />
              <svg v-else-if="element.type === 'table'" class="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
              <Circle v-else class="w-5 h-5 text-gray-600" />
              <span class="text-sm flex-1 truncate" :style="element.type === 'shape' ? { color: element.color } : {}">
                {{ getLayerName(element) }}
              </span>
              <button
                @click.stop="moveUp(element)"
                class="p-1 hover:bg-gray-200 rounded"
                title="上移一层"
              >
                <ChevronUp class="w-4 h-4" />
              </button>
              <button
                @click.stop="moveDown(element)"
                class="p-1 hover:bg-gray-200 rounded"
                title="下移一层"
              >
                <ChevronDown class="w-4 h-4" />
              </button>
              <button
                @click.stop="deleteElement(element)"
                class="p-1 hover:bg-red-100 text-red-500 rounded"
                title="删除"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div v-if="selectedElement" class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Edit3 class="w-5 h-5" />
            素材编辑
          </h3>
          
          <div v-if="selectedElement.type === 'image'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-2">裁剪区域 <span class="text-xs text-gray-400">(单位: %)</span></label>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">上边距</label>
                  <div class="relative">
                    <input
                      type="number"
                      v-model.number="imageEditorData.cropTop"
                      min="0"
                      max="100"
                      class="w-full px-2 py-1 border border-gray-300 rounded text-sm pr-6"
                      @input="updateImageElement"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">下边距</label>
                  <div class="relative">
                    <input
                      type="number"
                      v-model.number="imageEditorData.cropBottom"
                      min="0"
                      max="100"
                      class="w-full px-2 py-1 border border-gray-300 rounded text-sm pr-6"
                      @input="updateImageElement"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">左边距</label>
                  <div class="relative">
                    <input
                      type="number"
                      v-model.number="imageEditorData.cropLeft"
                      min="0"
                      max="100"
                      class="w-full px-2 py-1 border border-gray-300 rounded text-sm pr-6"
                      @input="updateImageElement"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">右边距</label>
                  <div class="relative">
                    <input
                      type="number"
                      v-model.number="imageEditorData.cropRight"
                      min="0"
                      max="100"
                      class="w-full px-2 py-1 border border-gray-300 rounded text-sm pr-6"
                      @input="updateImageElement"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1">
                <label class="block text-sm text-gray-600 mb-1">圆角: {{ imageEditorData.borderRadius }}px</label>
                <input
                  type="range"
                  v-model.number="imageEditorData.borderRadius"
                  min="0"
                  max="50"
                  class="w-full"
                  @input="updateImageElement"
                />
              </div>
              <button
                @click="resetImageToOriginal"
                class="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm whitespace-nowrap"
              >重置</button>
            </div>
            <div class="flex gap-2 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >后退</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >前进</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm"
              >复制</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-3 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-sm"
              >删除</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'border'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">边框颜色</label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="borderEditorData.borderColor"
                  @input="updateBorderElement"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex-shrink-0"
                />
                <input
                  type="text"
                  v-model="borderEditorData.borderColor"
                  @input="updateBorderElement"
                  class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">边框宽度: {{ borderEditorData.borderWidth }}px</label>
              <input
                type="range"
                v-model.number="borderEditorData.borderWidth"
                min="1"
                max="10"
                class="w-full"
                @input="updateBorderElement"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">圆角: {{ borderEditorData.borderRadius }}px</label>
              <input
                type="range"
                v-model.number="borderEditorData.borderRadius"
                min="0"
                max="50"
                class="w-full"
                @input="updateBorderElement"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">边框样式</label>
              <select
                v-model="borderEditorData.borderStyle"
                @change="updateBorderElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="solid">实线</option>
                <option value="dashed">虚线</option>
                <option value="dotted">点线</option>
                <option value="double">双线</option>
              </select>
            </div>
          </div>
          <div v-else-if="selectedElement.type === 'table'" class="space-y-4">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">行数: {{ tableEditorData.rows }}</label>
                <input
                  type="number"
                  v-model.number="tableEditorData.rows"
                  min="1"
                  max="10"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  @change="updateTableRows"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">列数: {{ tableEditorData.cols }}</label>
                <input
                  type="number"
                  v-model.number="tableEditorData.cols"
                  min="1"
                  max="10"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  @change="updateTableCols"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">边框颜色</label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="tableEditorData.borderColor"
                  @input="updateTableElement"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex-shrink-0"
                />
                <input
                  type="text"
                  v-model="tableEditorData.borderColor"
                  @input="updateTableElement"
                  class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">边框宽度: {{ tableEditorData.borderWidth }}px</label>
              <input
                type="range"
                v-model.number="tableEditorData.borderWidth"
                min="1"
                max="10"
                class="w-full"
                @input="updateTableElement"
              />
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">字号: {{ tableEditorData.fontSize }}px</label>
                <input
                  type="number"
                  v-model.number="tableEditorData.fontSize"
                  min="8"
                  max="48"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  @input="updateTableElement"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">文字颜色</label>
                <input
                  type="color"
                  v-model="tableEditorData.fontColor"
                  @input="updateTableElement"
                  class="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-2">编辑单元格内容</label>
              <div class="max-h-48 overflow-auto">
                <table class="w-full border-collapse">
                  <tbody>
                    <tr v-for="(row, rowIndex) in tableEditorData.rows" :key="rowIndex">
                      <td 
                        v-for="(col, colIndex) in tableEditorData.cols" 
                        :key="colIndex"
                        class="border border-gray-300 p-1"
                      >
                        <input
                          type="text"
                          :value="getTableCellValue(rowIndex, colIndex)"
                          @input="updateTableCell(rowIndex, colIndex, $event)"
                          class="w-full px-1 py-0.5 text-xs border-none outline-none bg-transparent"
                          placeholder="单元格"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex gap-2 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >后退</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >前进</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm"
              >复制</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-3 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-sm"
              >删除</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'text'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">字体</label>
              <select
                v-model="textEditorData.fontFamily"
                @change="updateTextElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="Microsoft YaHei">微软雅黑</option>
                <option value="SimHei">黑体</option>
                <option value="SimSun">宋体</option>
                <option value="KaiTi">楷体</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">字号: {{ textEditorData.fontSize }}px</label>
              <input
                type="range"
                v-model.number="textEditorData.fontSize"
                min="12"
                max="72"
                class="w-full"
                @input="updateTextElement"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">颜色</label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="textEditorData.color"
                  @input="updateTextElement"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex-shrink-0"
                />
                <input
                  type="text"
                  v-model="textEditorData.color"
                  @input="updateTextElement"
                  class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">对齐</label>
              <div class="flex gap-2">
                <button
                  @click="updateTextAlign('left')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm',
                    textEditorData.textAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >左</button>
                <button
                  @click="updateTextAlign('center')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm',
                    textEditorData.textAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >中</button>
                <button
                  @click="updateTextAlign('right')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm',
                    textEditorData.textAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >右</button>
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">样式</label>
              <div class="flex gap-2">
                <button
                  @click="updateTextStyle('bold')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm font-bold',
                    textEditorData.bold ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >粗体</button>
                <button
                  @click="updateTextStyle('italic')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm italic',
                    textEditorData.italic ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >斜体</button>
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">文字内容</label>
              <textarea
                v-model="textEditorData.text"
                @input="updateTextElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                rows="3"
              ></textarea>
            </div>
            <div class="flex gap-2 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >后退</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >前进</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm"
              >复制</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-3 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-sm"
              >删除</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'shape'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">形状颜色</label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="shapeEditorData.color"
                  @input="updateShapeElement"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex-shrink-0"
                />
                <input
                  type="text"
                  v-model="shapeEditorData.color"
                  @input="updateShapeElement"
                  class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div v-if="selectedElement?.shapeType === 'rectangle' || selectedElement?.shapeType === 'ellipse' || selectedElement?.shapeType === 'triangle' || selectedElement?.shapeType === 'diamond' || selectedElement?.shapeType === 'star' || selectedElement?.shapeType === 'heart' || selectedElement?.shapeType === 'arrow'" class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">宽度</label>
                <input
                  type="number"
                  :value="selectedElement.width"
                  @input="updateShapeWidth($event, selectedElement)"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  min="1"
                  max="9999"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">高度</label>
                <input
                  type="number"
                  :value="selectedElement.height"
                  @input="updateShapeHeight($event, selectedElement)"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  min="1"
                  max="9999"
                />
              </div>
            </div>
            <div v-if="selectedElement?.shapeType === 'rectangle'" class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">圆角</label>
                <input
                  type="number"
                  :value="selectedElement?.borderRadius || 0"
                  @input="updateShapeBorderRadius($event, selectedElement)"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">羽化: {{ shapeEditorData.blur }}px</label>
                <input
                  type="range"
                  v-model.number="shapeEditorData.blur"
                  min="0"
                  max="50"
                  class="w-full"
                  @input="updateShapeElement"
                />
              </div>
            </div>
            <div v-else-if="selectedElement?.shapeType === 'circle'" class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">半径</label>
                <input
                  type="number"
                  :value="Math.round(selectedElement.width / 2)"
                  @input="updateShapeRadius($event, selectedElement)"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  min="1"
                  max="4999"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">羽化: {{ shapeEditorData.blur }}px</label>
                <input
                  type="range"
                  v-model.number="shapeEditorData.blur"
                  min="0"
                  max="50"
                  class="w-full"
                  @input="updateShapeElement"
                />
              </div>
            </div>
            <div v-else class="grid grid-cols-2 gap-2">
              <div></div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">羽化: {{ shapeEditorData.blur }}px</label>
                <input
                  type="range"
                  v-model.number="shapeEditorData.blur"
                  min="0"
                  max="50"
                  class="w-full"
                  @input="updateShapeElement"
                />
              </div>
            </div>
            <div class="flex gap-2 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >后退</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-3 py-2 border rounded-lg text-sm',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >前进</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm"
              >复制</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-3 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-sm"
              >删除</button>
            </div>
          </div>
        </div>

        <div v-if="!selectedElement" class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Palette class="w-5 h-5" />
            画布设置
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">预设尺寸</label>
              <select
                v-model="selectedPreset"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                @change="applyPreset"
              >
                <option value="">自定义</option>
                <option value="a4">A4 (210 × 297mm)</option>
                <option value="a5">A5 (148 × 210mm)</option>
                <option value="a6">A6 (105 × 148mm)</option>
                <option value="letter">Letter (8.5 × 11in)</option>
                <option value="legal">Legal (8.5 × 14in)</option>
                <option value="poster">海报 (800 × 600px)</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">画布宽度 (px)</label>
                <input
                  type="number"
                  v-model.number="canvasWidth"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">画布高度 (px)</label>
                <input
                  type="number"
                  v-model.number="canvasHeight"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">背景类型</label>
              <div class="flex gap-2">
                <button
                  @click="canvasBgType = 'color'"
                  :class="[
                    'flex-1 py-2 px-3 rounded-lg text-sm transition-colors',
                    canvasBgType === 'color' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  颜色
                </button>
                <button
                  @click="canvasBgType = 'image'"
                  :class="[
                    'flex-1 py-2 px-3 rounded-lg text-sm transition-colors',
                    canvasBgType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  图片
                </button>
              </div>
            </div>
            <div v-if="canvasBgType === 'color'">
              <label class="block text-sm text-gray-600 mb-1">背景颜色</label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="canvasBgColor"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex-shrink-0"
                />
                <input
                  type="text"
                  v-model="canvasBgColor"
                  class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div v-if="canvasBgType === 'image'">
              <label class="block text-sm text-gray-600 mb-1">背景图片</label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  ref="bgImageInputRef"
                  @change="handleBgImageChange"
                />
                <button
                  @click="bgImageInputRef?.click()"
                  class="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Upload class="w-4 h-4" />
                  {{ canvasBgImage ? '更换图片' : '上传图片' }}
                </button>
                <button
                  v-if="canvasBgImage"
                  @click="canvasBgImage = ''"
                  class="w-full mt-2 py-2 px-3 border border-red-300 rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  移除图片
                </button>
                <div class="mt-3">
                  <label class="block text-sm text-gray-600 mb-1">填充方式</label>
                  <select
                    v-model="canvasBgFillMode"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="resize">重置画布尺寸</option>
                    <option value="cover">等比例铺满</option>
                    <option value="stretch">拉伸铺满</option>
                    <option value="actual">实际尺寸</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!selectedElement" class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Settings class="w-5 h-5" />
            默认设置
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">图片圆角: {{ defaultSettings.imageBorderRadius }}px</label>
              <input
                type="range"
                v-model.number="defaultSettings.imageBorderRadius"
                min="0"
                max="50"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">文字字号: {{ defaultSettings.textFontSize }}px</label>
              <input
                type="range"
                v-model.number="defaultSettings.textFontSize"
                min="12"
                max="72"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">文字颜色</label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="defaultSettings.textColor"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex-shrink-0"
                />
                <input
                  type="text"
                  v-model="defaultSettings.textColor"
                  class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-6 overflow-hidden">
        <div class="canvas-container flex items-center justify-center h-[calc(100vh-160px)] overflow-auto">
          <div
            class="canvas-wrapper"
            :style="{ transform: `scale(${canvasScale / 100})`, transformOrigin: 'center center' }"
          >
            <div
              ref="canvasRef"
              :style="getCanvasStyle()"
              class="relative shadow-lg overflow-hidden"
              @click="handleCanvasClick"
            >
            <div
              v-for="element in sortedElements"
              :key="element.id"
              :class="[
                'absolute cursor-move select-none',
                selectedElement?.id === element.id ? 'element-selected' : ''
              ]"
              :style="getElementStyle(element)"
              @mousedown="startDrag($event, element)"
              @click.stop="selectElement(element)"
            >
              <div v-if="element.type === 'image'" class="w-full h-full relative overflow-hidden" :style="{ borderRadius: element.borderRadius + 'px', clipPath: getClipPath(element) }">
                <img
                  v-if="selectedElement?.id === element.id && hasCrop(element)"
                  :src="element.src"
                  class="absolute inset-0 w-full h-full object-cover opacity-40"
                  draggable="false"
                />
                <img
                  :src="element.src"
                  class="w-full h-full"
                  draggable="false"
                  :style="{ objectFit: 'fill' }"
                />
                <div
                  v-if="selectedElement?.id === element.id && hasCrop(element)"
                  class="absolute inset-0 pointer-events-none"
                >
                  <div class="absolute inset-0" :style="getCropMaskStyle(element)"></div>
                  <div
                    class="absolute border-2 border-red-500 border-dashed"
                    :style="getCropOverlayStyle(element)"
                  ></div>
                </div>
              </div>
              <div
                v-else-if="element.type === 'text'"
                class="w-full h-full flex items-center justify-center"
                :style="getTextStyle(element)"
              >
                {{ element.text }}
              </div>
              <div
                v-else-if="element.type === 'shape' && (element.shapeType === 'rectangle' || element.shapeType === 'circle' || element.shapeType === 'ellipse')"
                class="w-full h-full"
                :style="getBasicShapeStyle(element)"
              ></div>
              <div v-else-if="element.type === 'shape'" class="w-full h-full relative">
                <div 
                  class="absolute inset-0 flex items-center justify-center"
                  :style="getShapeOuterStyle(element)"
                >
                  <svg v-if="element.shapeType === 'heart'" :width="element.width" :height="element.height" viewBox="0 0 24 24" class="overflow-visible">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" :fill="element.color"/>
                  </svg>
                  <svg v-else-if="element.shapeType === 'star'" :width="element.width" :height="element.height" viewBox="0 0 24 24" class="overflow-visible">
                    <polygon points="12,2 15,9 22,9 16,14 18,22 12,18 6,22 8,14 2,9 9,9" :fill="element.color"/>
                  </svg>
                  <svg v-else-if="element.shapeType === 'arrow'" :width="element.width" :height="element.height" viewBox="0 0 24 24" class="overflow-visible">
                    <rect x="3" y="8" width="14" height="8" rx="1" :fill="element.color"/>
                    <polygon points="17,4 24,12 17,20" :fill="element.color"/>
                  </svg>
                  <div v-else :style="getShapeInnerStyle(element)"></div>
                </div>
              </div>
              <div v-else-if="element.type === 'icon'" class="w-full h-full flex items-center justify-center">
                <component 
                  :is="iconList.find(i => i.name === element.iconName)?.component || Star" 
                  class="w-full h-full"
                  :style="{ color: element.color }"
                />
              </div>
              <div v-else-if="element.type === 'sticker'" class="w-full h-full flex items-center justify-center" :style="{ fontSize: `${Math.min(element.width, element.height) * (element.scale / 100) * 0.8}px` }">
                {{ element.emoji }}
              </div>
              <div 
                v-else-if="element.type === 'border'" 
                class="w-full h-full flex items-center justify-center"
                :style="{ 
                  border: `${element.borderWidth || 2}px ${element.borderStyle} ${element.borderColor}`,
                  borderRadius: element.borderRadius + 'px'
                }"
              >
                <span class="text-gray-400 text-sm">添加内容</span>
              </div>
              <div 
                v-else-if="element.type === 'table'" 
                class="w-full h-full overflow-hidden"
                :style="{ borderRadius: '4px', border: `${element.borderWidth}px solid ${element.borderColor}` }"
              >
                <div class="w-full h-full grid" :style="{ gridTemplateColumns: `repeat(${element.cols}, 1fr)`, gridAutoRows: `${100 / element.rows}%` }">
                  <div 
                    v-for="(cell, index) in element.cells" 
                    :key="index"
                    class="relative"
                    :style="{ 
                      borderRight: (index + 1) % element.cols !== 0 ? `${element.borderWidth}px solid ${element.borderColor}` : 'none',
                      borderBottom: index < element.cells.length - element.cols ? `${element.borderWidth}px solid ${element.borderColor}` : 'none'
                    }"
                  >
                    <div 
                      class="absolute inset-0 flex items-center justify-center overflow-hidden"
                      :style="{ 
                        padding: '2px',
                        fontSize: `${element.fontSize || 14}px`,
                        color: element.fontColor || '#333333',
                        wordBreak: 'break-all'
                      }"
                    >
                      {{ cell?.text || '' }}
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="selectedElement?.id === element.id"
                class="absolute inset-0 pointer-events-none"
              >
                <div 
                  class="resize-handle top-left"
                  style="pointer-events: auto; cursor: nwse-resize;"
                  @mousedown="startResize($event, element, 'corner', 'top', 'left')"
                ></div>
                <div 
                  class="resize-handle top-right"
                  style="pointer-events: auto; cursor: nesw-resize;"
                  @mousedown="startResize($event, element, 'corner', 'top', 'right')"
                ></div>
                <div 
                  class="resize-handle bottom-left"
                  style="pointer-events: auto; cursor: nesw-resize;"
                  @mousedown="startResize($event, element, 'corner', 'bottom', 'left')"
                ></div>
                <div 
                  class="resize-handle bottom-right"
                  style="pointer-events: auto; cursor: nwse-resize;"
                  @mousedown="startResize($event, element, 'corner', 'bottom', 'right')"
                ></div>
                <div 
                  class="resize-handle top"
                  style="pointer-events: auto; cursor: ns-resize;"
                  @mousedown="startResize($event, element, 'edge', 'top')"
                ></div>
                <div 
                  class="resize-handle bottom"
                  style="pointer-events: auto; cursor: ns-resize;"
                  @mousedown="startResize($event, element, 'edge', 'bottom')"
                ></div>
                <div 
                  class="resize-handle left"
                  style="pointer-events: auto; cursor: ew-resize;"
                  @mousedown="startResize($event, element, 'edge', 'left')"
                ></div>
                <div 
                  class="resize-handle right"
                  style="pointer-events: auto; cursor: ew-resize;"
                  @mousedown="startResize($event, element, 'edge', 'right')"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  LayoutGrid, ImagePlus, Type, Download, Layers,
  ChevronUp, ChevronDown, Trash2, Palette, X,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  Edit3, Copy, Image as ImageIcon, Upload, Square, Circle, Settings,
  Triangle, Star, Heart, ArrowRight, Hexagon, MoreHorizontal
} from 'lucide-vue-next'
import html2canvas from 'html2canvas'

const fileInputRef = ref(null)
const canvasRef = ref(null)
const bgImageInputRef = ref(null)
const canvasWidth = ref(800)
const canvasHeight = ref(600)
const canvasBgColor = ref('#ffffff')
const canvasBgType = ref('color')
const canvasBgImage = ref('')
const canvasBgFillMode = ref('resize')
const selectedPreset = ref('')
const canvasScale = ref(100)
const elements = ref([])
const selectedElement = ref(null)
const showShapeMenu = ref(false)
const showIconMenu = ref(false)
const showStickerMenu = ref(false)
const showBorderMenu = ref(false)
const showOtherMenu = ref(false)

const toggleMenu = (menuName) => {
  showShapeMenu.value = menuName === 'shape' ? !showShapeMenu.value : false
  showIconMenu.value = menuName === 'icon' ? !showIconMenu.value : false
  showStickerMenu.value = menuName === 'sticker' ? !showStickerMenu.value : false
  showBorderMenu.value = menuName === 'border' ? !showBorderMenu.value : false
  showOtherMenu.value = menuName === 'other' ? !showOtherMenu.value : false
}

const shapeEditorData = ref({
  color: '#3b82f6',
  blur: 0
})

const defaultSettings = ref({
  imageBorderRadius: 0,
  textFontSize: 24,
  textColor: '#333333'
})

const iconList = [
  { name: 'star', label: '星星', component: Star },
  { name: 'heart', label: '心形', component: Heart },
  { name: 'circle', label: '圆形', component: Circle },
  { name: 'triangle', label: '三角', component: Triangle },
  { name: 'square', label: '方形', component: Square },
  { name: 'hexagon', label: '六角', component: Hexagon },
  { name: 'arrow', label: '箭头', component: ArrowRight },
  { name: 'download', label: '下载', component: Download },
  { name: 'upload', label: '上传', component: Upload },
  { name: 'edit', label: '编辑', component: Edit3 },
  { name: 'copy', label: '复制', component: Copy },
  { name: 'settings', label: '设置', component: Settings }
]

const stickerList = [
  { name: 'happy', label: '开心', emoji: '😊' },
  { name: 'love', label: '爱心', emoji: '❤️' },
  { name: 'star', label: '星星', emoji: '⭐' },
  { name: 'fire', label: '火焰', emoji: '🔥' },
  { name: 'sparkle', label: '闪光', emoji: '✨' },
  { name: 'thumbsup', label: '点赞', emoji: '👍' },
  { name: 'heart_eyes', label: '花痴', emoji: '😍' },
  { name: 'laugh', label: '大笑', emoji: '😂' },
  { name: 'cool', label: '酷', emoji: '😎' },
  { name: 'sad', label: '难过', emoji: '😢' },
  { name: 'angry', label: '生气', emoji: '😠' },
  { name: 'surprised', label: '惊讶', emoji: '😮' },
  { name: 'celebrate', label: '庆祝', emoji: '🎉' },
  { name: 'confetti', label: '彩带', emoji: '🎊' },
  { name: 'cake', label: '蛋糕', emoji: '🎂' },
  { name: 'party', label: '派对', emoji: '🥳' }
]

const borderList = [
  { name: 'solid', label: '实线', style: 'solid', color: '#333333', radius: 0 },
  { name: 'dashed', label: '虚线', style: 'dashed', color: '#333333', radius: 0 },
  { name: 'dotted', label: '点线', style: 'dotted', color: '#333333', radius: 0 },
  { name: 'double', label: '双线', style: 'double', color: '#333333', radius: 0 },
  { name: 'rounded', label: '圆角', style: 'solid', color: '#333333', radius: 8 },
  { name: 'rounded-lg', label: '大圆角', style: 'solid', color: '#333333', radius: 16 },
  { name: 'red', label: '红色', style: 'solid', color: '#ef4444', radius: 0 },
  { name: 'blue', label: '蓝色', style: 'solid', color: '#3b82f6', radius: 0 }
]

const imageEditorData = ref({
  src: '',
  scale: 100,
  borderRadius: 0,
  width: 0,
  height: 0,
  cropTop: 0,
  cropBottom: 0,
  cropLeft: 0,
  cropRight: 0
})

const tableEditorData = ref({
  rows: 3,
  cols: 3,
  borderColor: '#333333',
  borderWidth: 1,
  fontSize: 14,
  fontColor: '#333333',
  cells: []
})

const borderEditorData = ref({
  borderColor: '#333333',
  borderWidth: 2,
  borderRadius: 4,
  borderStyle: 'solid'
})

const textEditorData = ref({
  fontFamily: 'Microsoft YaHei',
  fontSize: 24,
  color: '#333333',
  textAlign: 'center',
  bold: false,
  italic: false,
  text: ''
})

const dragData = ref({
  element: null,
  startX: 0,
  startY: 0,
  startLeft: 0,
  startTop: 0
})

const history = ref([])
const historyIndex = ref(-1)

let idCounter = 0

const saveHistory = (element) => {
  const snapshot = JSON.parse(JSON.stringify(element))
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(snapshot)
  historyIndex.value = history.value.length - 1
}

const undo = () => {
  if (historyIndex.value <= 0) return
  historyIndex.value--
  const snapshot = history.value[historyIndex.value]
  const element = elements.value.find(e => e.id === snapshot.id)
  if (element) {
    Object.assign(element, JSON.parse(JSON.stringify(snapshot)))
    if (element.type === 'image') {
      imageEditorData.value = { ...element }
    } else {
      textEditorData.value = { ...element }
    }
  }
}

const redo = () => {
  if (historyIndex.value >= history.value.length - 1) return
  historyIndex.value++
  const snapshot = history.value[historyIndex.value]
  const element = elements.value.find(e => e.id === snapshot.id)
  if (element) {
    Object.assign(element, JSON.parse(JSON.stringify(snapshot)))
    if (element.type === 'image') {
      imageEditorData.value = { ...element }
    } else {
      textEditorData.value = { ...element }
    }
  }
}

const updateImageElement = () => {
  if (selectedElement.value?.type === 'image') {
    const el = selectedElement.value
    if (el.scale !== imageEditorData.value.scale || 
        el.borderRadius !== imageEditorData.value.borderRadius ||
        el.width !== imageEditorData.value.width ||
        el.height !== imageEditorData.value.height ||
        el.cropTop !== imageEditorData.value.cropTop ||
        el.cropBottom !== imageEditorData.value.cropBottom ||
        el.cropLeft !== imageEditorData.value.cropLeft ||
        el.cropRight !== imageEditorData.value.cropRight) {
      saveHistory(el)
      el.scale = imageEditorData.value.scale
      el.borderRadius = imageEditorData.value.borderRadius
      el.width = imageEditorData.value.width
      el.height = imageEditorData.value.height
      el.cropTop = imageEditorData.value.cropTop
      el.cropBottom = imageEditorData.value.cropBottom
      el.cropLeft = imageEditorData.value.cropLeft
      el.cropRight = imageEditorData.value.cropRight
    }
  }
}

const resetImageToOriginal = () => {
  if (selectedElement.value?.type === 'image') {
    const el = selectedElement.value
    saveHistory(el)
    
    const resetX = el.originalX !== undefined ? el.originalX : el.x
    const resetY = el.originalY !== undefined ? el.originalY : el.y
    const resetWidth = el.originalWidth !== undefined ? el.originalWidth : el.width
    const resetHeight = el.originalHeight !== undefined ? el.originalHeight : el.height
    
    const index = elements.value.findIndex(e => e.id === el.id)
    if (index !== -1) {
      elements.value[index] = {
        ...elements.value[index],
        x: resetX,
        y: resetY,
        width: resetWidth,
        height: resetHeight,
        scale: 100,
        borderRadius: 0,
        cropTop: 0,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0
      }
      
      selectedElement.value = elements.value[index]
    }
    
    imageEditorData.value.width = resetWidth
    imageEditorData.value.height = resetHeight
    imageEditorData.value.scale = 100
    imageEditorData.value.borderRadius = 0
    imageEditorData.value.cropTop = 0
    imageEditorData.value.cropBottom = 0
    imageEditorData.value.cropLeft = 0
    imageEditorData.value.cropRight = 0
  }
}

const updateTextElement = () => {
  if (selectedElement.value?.type === 'text') {
    const el = selectedElement.value
    if (el.fontFamily !== textEditorData.value.fontFamily ||
        el.fontSize !== textEditorData.value.fontSize ||
        el.color !== textEditorData.value.color ||
        el.text !== textEditorData.value.text) {
      saveHistory(el)
      el.fontFamily = textEditorData.value.fontFamily
      el.fontSize = textEditorData.value.fontSize
      el.color = textEditorData.value.color
      el.text = textEditorData.value.text
    }
  }
}

const updateTextAlign = (align) => {
  if (selectedElement.value?.type === 'text') {
    const el = selectedElement.value
    if (el.textAlign !== align) {
      saveHistory(el)
      el.textAlign = align
      textEditorData.value.textAlign = align
    }
  }
}

const updateTextStyle = (style) => {
  if (selectedElement.value?.type === 'text') {
    const el = selectedElement.value
    if (style === 'bold') {
      saveHistory(el)
      el.bold = !el.bold
      textEditorData.value.bold = el.bold
    } else if (style === 'italic') {
      saveHistory(el)
      el.italic = !el.italic
      textEditorData.value.italic = el.italic
    }
  }
}

const getLayerName = (element) => {
  if (element.type === 'image') {
    return '图片'
  } else if (element.type === 'text') {
    return '文字'
  } else if (element.type === 'shape') {
    const shapeNames = {
      rectangle: '矩形',
      circle: '圆形',
      ellipse: '椭圆',
      triangle: '三角形',
      diamond: '菱形',
      star: '五角星',
      heart: '心形',
      arrow: '箭头'
    }
    return shapeNames[element.shapeType] || '形状'
  } else if (element.type === 'icon') {
    const iconNames = {
      star: '星星',
      heart: '心形',
      circle: '圆形',
      triangle: '三角',
      square: '方形',
      hexagon: '六角',
      arrow: '箭头',
      download: '下载',
      upload: '上传',
      edit: '编辑',
      copy: '复制',
      settings: '设置'
    }
    return iconNames[element.iconName] || '图标'
  } else if (element.type === 'sticker') {
    const stickerNames = {
      happy: '开心',
      love: '爱心',
      star: '星星',
      fire: '火焰',
      sparkle: '闪光',
      thumbsup: '点赞',
      heart_eyes: '花痴',
      laugh: '大笑',
      cool: '酷',
      sad: '难过',
      angry: '生气',
      surprised: '惊讶',
      celebrate: '庆祝',
      confetti: '彩带',
      cake: '蛋糕',
      party: '派对'
    }
    return stickerNames[element.stickerName] || '贴纸'
  } else if (element.type === 'border') {
    const borderNames = {
      solid: '实线边框',
      dashed: '虚线边框',
      dotted: '点线边框',
      double: '双线边框',
      rounded: '圆角边框',
      'rounded-lg': '大圆角边框',
      red: '红色边框',
      blue: '蓝色边框'
    }
    return borderNames[element.borderName] || '边框'
  } else if (element.type === 'table') {
    return '表格'
  }
  return '元素'
}

const sortedElements = computed(() => {
  return [...elements.value].sort((a, b) => a.zIndex - b.zIndex)
})

const getElementStyle = (element) => {
  const baseStyle = {
    left: element.x + 'px',
    top: element.y + 'px',
    width: element.width * (element.scale / 100) + 'px',
    height: element.height * (element.scale / 100) + 'px',
    zIndex: element.zIndex
  }
  return baseStyle
}

const hasCrop = (element) => {
  return element.cropTop > 0 || element.cropBottom > 0 || element.cropLeft > 0 || element.cropRight > 0
}

const getClipPath = (element) => {
  const cropTop = element.cropTop || 0
  const cropBottom = element.cropBottom || 0
  const cropLeft = element.cropLeft || 0
  const cropRight = element.cropRight || 0
  const borderRadius = element.borderRadius || 0
  
  if (cropTop === 0 && cropBottom === 0 && cropLeft === 0 && cropRight === 0) {
    return borderRadius > 0 ? `inset(0% 0% 0% 0% round ${borderRadius}px)` : 'none'
  }
  
  return `inset(${cropTop}% ${cropRight}% ${cropBottom}% ${cropLeft}% round ${borderRadius}px)`
}



const getImageStyle = (element) => {
  const cropTop = element.cropTop || 0
  const cropBottom = element.cropBottom || 0
  const cropLeft = element.cropLeft || 0
  const cropRight = element.cropRight || 0
  
  if (cropTop === 0 && cropBottom === 0 && cropLeft === 0 && cropRight === 0) {
    return {}
  }
  
  const visibleWidth = 100 - cropLeft - cropRight
  const visibleHeight = 100 - cropTop - cropBottom
  
  if (visibleWidth <= 0 || visibleHeight <= 0) {
    return { objectFit: 'cover' }
  }
  
  const posX = cropLeft + visibleWidth / 2
  const posY = cropTop + visibleHeight / 2
  
  return {
    objectFit: 'cover',
    objectPosition: `${posX}% ${posY}%`
  }
}

const getCropOverlayStyle = (element) => {
  const cropTop = element.cropTop || 0
  const cropBottom = element.cropBottom || 0
  const cropLeft = element.cropLeft || 0
  const cropRight = element.cropRight || 0
  
  return {
    top: cropTop + '%',
    left: cropLeft + '%',
    width: (100 - cropLeft - cropRight) + '%',
    height: (100 - cropTop - cropBottom) + '%'
  }
}

const getCropMaskStyle = (element) => {
  const cropTop = element.cropTop || 0
  const cropBottom = element.cropBottom || 0
  const cropLeft = element.cropLeft || 0
  const cropRight = element.cropRight || 0
  
  return {
    boxShadow: `inset ${cropLeft}% ${cropTop}% 0 0 rgba(0, 0, 0, 0.5),
                inset ${-cropRight}% ${-cropBottom}% 0 0 rgba(0, 0, 0, 0.5)`
  }
}

const getCanvasStyle = () => {
  const style = {
    width: canvasWidth.value + 'px',
    height: canvasHeight.value + 'px'
  }
  if (canvasBgType.value === 'color') {
    style.backgroundColor = canvasBgColor.value
  } else if (canvasBgType.value === 'image' && canvasBgImage.value) {
    style.backgroundImage = `url(${canvasBgImage.value})`
    style.backgroundPosition = 'center'
    style.backgroundRepeat = 'no-repeat'
    
    switch (canvasBgFillMode.value) {
      case 'cover':
        style.backgroundSize = 'cover'
        break
      case 'stretch':
        style.backgroundSize = '100% 100%'
        break
      case 'actual':
        style.backgroundSize = 'auto'
        break
      case 'resize':
      default:
        style.backgroundSize = 'cover'
        break
    }
  }
  return style
}

const presetSizes = {
  a4: { width: 2480, height: 3508 },
  a5: { width: 1748, height: 2480 },
  a6: { width: 1240, height: 1748 },
  letter: { width: 2480, height: 3508 },
  legal: { width: 2480, height: 4224 },
  poster: { width: 800, height: 600 }
}

const applyPreset = () => {
  if (selectedPreset.value && presetSizes[selectedPreset.value]) {
    const size = presetSizes[selectedPreset.value]
    canvasWidth.value = size.width
    canvasHeight.value = size.height
  }
}

const handleBgImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      canvasBgImage.value = e.target.result
      if (canvasBgFillMode.value === 'resize') {
        const img = new Image()
        img.onload = () => {
          canvasWidth.value = img.width
          canvasHeight.value = img.height
        }
        img.src = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
}

watch(canvasBgFillMode, (newMode) => {
  if (newMode === 'resize' && canvasBgImage.value) {
    const img = new Image()
    img.onload = () => {
      canvasWidth.value = img.width
      canvasHeight.value = img.height
    }
    img.src = canvasBgImage.value
  }
})

watch([canvasWidth, canvasHeight], () => {
  const w = canvasWidth.value
  const h = canvasHeight.value
  
  for (const [key, size] of Object.entries(presetSizes)) {
    if (size.width === w && size.height === h) {
      selectedPreset.value = key
      return
    }
  }
  
  selectedPreset.value = ''
})

watch([canvasWidth, canvasHeight], () => {
  const canvasContainer = document.querySelector('.canvas-container')
  if (canvasContainer) {
    const rect = canvasContainer.getBoundingClientRect()
    const maxWidth = rect.width - 40
    const maxHeight = rect.height - 40
    
    const scaleX = (maxWidth / canvasWidth.value) * 100
    const scaleY = (maxHeight / canvasHeight.value) * 100
    
    canvasScale.value = Math.max(10, Math.min(100, Math.min(scaleX, scaleY)))
  }
}, { immediate: true })

const updateCanvasScale = () => {
  const canvasContainer = document.querySelector('.canvas-container')
  if (canvasContainer) {
    const rect = canvasContainer.getBoundingClientRect()
    const maxWidth = rect.width - 40
    const maxHeight = rect.height - 40
    
    const scaleX = (maxWidth / canvasWidth.value) * 100
    const scaleY = (maxHeight / canvasHeight.value) * 100
    
    canvasScale.value = Math.max(10, Math.min(100, Math.min(scaleX, scaleY)))
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', updateCanvasScale)
}

const handleKeyDown = (event) => {
  if (!selectedElement.value) return
  
  const target = event.target
  const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
  if (isInput) return

  const step = 1
  let updated = false

  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      selectedElement.value.y -= step
      updated = true
      break
    case 'ArrowDown':
      event.preventDefault()
      selectedElement.value.y += step
      updated = true
      break
    case 'ArrowLeft':
      event.preventDefault()
      selectedElement.value.x -= step
      updated = true
      break
    case 'ArrowRight':
      event.preventDefault()
      selectedElement.value.x += step
      updated = true
      break
  }

  if (updated) {
    const element = selectedElement.value
    const displayWidth = element.width * (element.scale / 100)
    const displayHeight = element.height * (element.scale / 100)

    const minX = -displayWidth + 1
    const maxX = canvasWidth.value - 1
    const minY = -displayHeight + 1
    const maxY = canvasHeight.value - 1

    element.x = Math.max(minX, Math.min(maxX, element.x))
    element.y = Math.max(minY, Math.min(maxY, element.y))
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('resize', updateCanvasScale)
})

const addShape = (shapeType) => {
  const width = shapeType === 'circle' ? 100 : 150
  const height = 100
  
  const newElement = {
    id: ++idCounter,
    type: 'shape',
    shapeType,
    x: (canvasWidth.value - width) / 2,
    y: (canvasHeight.value - height) / 2,
    width,
    height,
    scale: 100,
    color: shapeEditorData.value.color,
    blur: 0,
    zIndex: elements.value.length + 1
  }
  
  elements.value.push(newElement)
  selectElement(newElement)
}

const addIcon = (iconName) => {
  const width = 60
  const height = 60
  const icon = iconList.find(i => i.name === iconName)
  
  const newElement = {
    id: ++idCounter,
    type: 'icon',
    iconName,
    iconComponent: icon?.name || 'smile',
    x: (canvasWidth.value - width) / 2,
    y: (canvasHeight.value - height) / 2,
    width,
    height,
    scale: 100,
    color: '#333333',
    zIndex: elements.value.length + 1
  }
  
  elements.value.push(newElement)
  selectElement(newElement)
}

const addSticker = (sticker) => {
  const width = 80
  const height = 80
  
  const newElement = {
    id: ++idCounter,
    type: 'sticker',
    stickerName: sticker.name,
    emoji: sticker.emoji,
    x: (canvasWidth.value - width) / 2,
    y: (canvasHeight.value - height) / 2,
    width,
    height,
    scale: 100,
    zIndex: elements.value.length + 1
  }
  
  elements.value.push(newElement)
  selectElement(newElement)
}

const addBorder = (border) => {
  const width = 200
  const height = 150
  
  const newElement = {
    id: ++idCounter,
    type: 'border',
    borderName: border.name,
    borderStyle: border.style,
    borderColor: border.color,
    borderRadius: border.radius,
    x: (canvasWidth.value - width) / 2,
    y: (canvasHeight.value - height) / 2,
    width,
    height,
    scale: 100,
    zIndex: elements.value.length + 1
  }
  
  elements.value.push(newElement)
  selectElement(newElement)
}

const addTable = () => {
  const width = 250
  const height = 150
  
  const newElement = {
    id: ++idCounter,
    type: 'table',
    rows: 3,
    cols: 3,
    cells: [
      { text: '单元格1' }, { text: '单元格2' }, { text: '单元格3' },
      { text: '单元格4' }, { text: '单元格5' }, { text: '单元格6' },
      { text: '单元格7' }, { text: '单元格8' }, { text: '单元格9' }
    ],
    x: (canvasWidth.value - width) / 2,
    y: (canvasHeight.value - height) / 2,
    width,
    height,
    scale: 100,
    borderColor: '#333333',
    borderWidth: 1,
    zIndex: elements.value.length + 1
  }
  
  elements.value.push(newElement)
  selectElement(newElement)
}

const updateShapeWidth = (event, element) => {
  let value = parseInt(event.target.value) || 1
  value = Math.max(1, Math.min(9999, value))
  event.target.value = value
  element.width = value
}

const updateShapeHeight = (event, element) => {
  let value = parseInt(event.target.value) || 1
  value = Math.max(1, Math.min(9999, value))
  event.target.value = value
  element.height = value
}

const updateShapeRadius = (event, element) => {
  let value = parseInt(event.target.value) || 1
  value = Math.max(1, Math.min(4999, value))
  event.target.value = value
  element.width = value * 2
  element.height = value * 2
}

const updateShapeBorderRadius = (event, element) => {
  let value = parseInt(event.target.value) || 0
  value = Math.max(0, Math.min(100, value))
  event.target.value = value
  element.borderRadius = value
}

const getBasicShapeStyle = (element) => {
  const displayWidth = element.width * (element.scale / 100)
  const displayHeight = element.height * (element.scale / 100)
  
  const style = {
    backgroundColor: element.color,
    width: `${displayWidth}px`,
    height: `${displayHeight}px`
  }
  
  if (element.shapeType === 'circle') {
    style.borderRadius = '50%'
  } else if (element.shapeType === 'ellipse') {
    style.borderRadius = '50%'
  } else if (element.shapeType === 'rectangle') {
    style.borderRadius = ((element.borderRadius || 0) * (element.scale / 100)) + 'px'
  }
  
  if (element.blur && element.blur > 0) {
    const blur = element.blur
    style.filter = `blur(${blur}px)`
    style.transform = `scale(${1 + blur / 100})`
  }
  
  return style
}

const getShapeOuterStyle = (element) => {
  const style = {}
  if (element.blur && element.blur > 0) {
    const blur = element.blur
    style.filter = `blur(${blur}px)`
    style.width = `${element.width + blur * 4}px`
    style.height = `${element.height + blur * 4}px`
    style.marginLeft = `-${blur * 2}px`
    style.marginTop = `-${blur * 2}px`
    style.marginRight = `-${blur * 2}px`
    style.marginBottom = `-${blur * 2}px`
    style.transform = 'scale(1)'
    style.transformOrigin = 'center center'
  }
  return style
}

const getShapeInnerStyle = (element) => {
  const style = {
    backgroundColor: element.color,
    width: `${element.width}px`,
    height: `${element.height}px`
  }
  
  if (element.shapeType === 'circle') {
    style.borderRadius = '50%'
  } else if (element.shapeType === 'ellipse') {
    style.borderRadius = '50%'
  } else if (element.shapeType === 'rectangle') {
    style.borderRadius = (element.borderRadius || 0) + 'px'
  } else if (element.shapeType === 'triangle') {
    style.clipPath = `polygon(50% 0%, 0% 100%, 100% 100%)`
  } else if (element.shapeType === 'diamond') {
    style.clipPath = `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`
  } else if (element.shapeType === 'star') {
    style.clipPath = `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`
  } else if (element.shapeType === 'heart') {
    style.clipPath = `polygon(50% 95%, 5% 55%, 20% 50%, 35% 65%, 50% 5%, 65% 65%, 80% 50%, 95% 55%)`
  } else if (element.shapeType === 'arrow') {
    const w = element.width
    const h = element.height
    const shaftWidth = h * 0.3
    const arrowHeadLen = h * 0.5
    style.clipPath = `polygon(0% ${50 - shaftWidth/2}%, 0% ${50 + shaftWidth/2}%, ${w - arrowHeadLen}% ${50 + shaftWidth/2}%, ${w - arrowHeadLen}% ${50 + h/2}%, 100% 50%, ${w - arrowHeadLen}% ${50 - h/2}%, ${w - arrowHeadLen}% ${50 - shaftWidth/2}%, 0% ${50 - shaftWidth/2}%)`
  }
  
  if (element.blur && element.blur > 0) {
    style.opacity = 0.9
  }
  
  return style
}

const updateShapeElement = () => {
  if (selectedElement.value && selectedElement.value.type === 'shape') {
    saveHistory(selectedElement.value)
    selectedElement.value.color = shapeEditorData.value.color
    selectedElement.value.blur = shapeEditorData.value.blur
  }
}

const updateBorderElement = () => {
  if (selectedElement.value && selectedElement.value.type === 'border') {
    saveHistory(selectedElement.value)
    selectedElement.value.borderColor = borderEditorData.value.borderColor
    selectedElement.value.borderWidth = borderEditorData.value.borderWidth
    selectedElement.value.borderRadius = borderEditorData.value.borderRadius
    selectedElement.value.borderStyle = borderEditorData.value.borderStyle
  }
}

const updateTableElement = () => {
  if (selectedElement.value && selectedElement.value.type === 'table') {
    saveHistory(selectedElement.value)
    selectedElement.value.borderColor = tableEditorData.value.borderColor
    selectedElement.value.borderWidth = tableEditorData.value.borderWidth
    selectedElement.value.fontSize = tableEditorData.value.fontSize
    selectedElement.value.fontColor = tableEditorData.value.fontColor
  }
}

const updateTableRows = () => {
  if (selectedElement.value && selectedElement.value.type === 'table') {
    saveHistory(selectedElement.value)
    const oldRows = selectedElement.value.rows
    const oldCols = selectedElement.value.cols
    const newRows = tableEditorData.value.rows
    
    const newCells = []
    for (let row = 0; row < newRows; row++) {
      for (let col = 0; col < oldCols; col++) {
        const oldIndex = row * oldCols + col
        if (row < oldRows && selectedElement.value.cells[oldIndex]) {
          newCells.push({ text: selectedElement.value.cells[oldIndex].text })
        } else {
          newCells.push({ text: '' })
        }
      }
    }
    
    selectedElement.value.rows = newRows
    selectedElement.value.cells = newCells
  }
}

const updateTableCols = () => {
  if (selectedElement.value && selectedElement.value.type === 'table') {
    saveHistory(selectedElement.value)
    const oldRows = selectedElement.value.rows
    const oldCols = selectedElement.value.cols
    const newCols = tableEditorData.value.cols
    
    const newCells = []
    for (let row = 0; row < oldRows; row++) {
      for (let col = 0; col < newCols; col++) {
        const oldIndex = row * oldCols + col
        if (col < oldCols && selectedElement.value.cells[oldIndex]) {
          newCells.push({ text: selectedElement.value.cells[oldIndex].text })
        } else {
          newCells.push({ text: '' })
        }
      }
    }
    
    selectedElement.value.cols = newCols
    selectedElement.value.cells = newCells
  }
}

const getTableCellValue = (row, col) => {
  if (selectedElement.value && selectedElement.value.type === 'table') {
    const index = row * selectedElement.value.cols + col
    return selectedElement.value.cells[index]?.text || ''
  }
  return ''
}

const updateTableCell = (row, col, event) => {
  if (selectedElement.value && selectedElement.value.type === 'table') {
    saveHistory(selectedElement.value)
    const index = row * selectedElement.value.cols + col
    if (selectedElement.value.cells[index]) {
      selectedElement.value.cells[index].text = event.target.value
    }
  }
}

const getTextStyle = (element) => {
  return {
    fontFamily: element.fontFamily,
    fontSize: element.fontSize + 'px',
    color: element.color,
    textAlign: element.textAlign,
    fontWeight: element.bold ? 'bold' : 'normal',
    fontStyle: element.italic ? 'italic' : 'normal'
  }
}

const addImage = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > canvasWidth.value) {
        height = (canvasWidth.value / width) * height
        width = canvasWidth.value
      }
      if (height > canvasHeight.value) {
        width = (canvasHeight.value / height) * width
        height = canvasHeight.value
      }

      const posX = (canvasWidth.value - width) / 2
      const posY = (canvasHeight.value - height) / 2
      
      const newElement = {
        id: ++idCounter,
        type: 'image',
        src: e.target.result,
        x: posX,
        y: posY,
        width,
        height,
        originalX: posX,
        originalY: posY,
        originalWidth: width,
        originalHeight: height,
        scale: 100,
        borderRadius: defaultSettings.value.imageBorderRadius,
        cropTop: 0,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0,
        zIndex: elements.value.length + 1
      }

      elements.value.push(newElement)
      selectElement(newElement)
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

const addText = () => {
  const fontSize = defaultSettings.value.textFontSize
  const newElement = {
    id: ++idCounter,
    type: 'text',
    text: '双击编辑文字',
    x: canvasWidth.value / 2 - 100,
    y: canvasHeight.value / 2 - fontSize / 2,
    width: 200,
    height: fontSize + 16,
    scale: 100,
    fontFamily: 'Microsoft YaHei',
    fontSize: fontSize,
    color: defaultSettings.value.textColor,
    textAlign: 'center',
    bold: false,
    italic: false,
    zIndex: elements.value.length + 1
  }

  elements.value.push(newElement)
  selectElement(newElement)
}

const selectElement = (element) => {
  selectedElement.value = element
  if (element.type === 'image') {
    imageEditorData.value = {
      src: element.src,
      scale: element.scale,
      borderRadius: element.borderRadius,
      width: element.width,
      height: element.height,
      cropTop: element.cropTop || 0,
      cropBottom: element.cropBottom || 0,
      cropLeft: element.cropLeft || 0,
      cropRight: element.cropRight || 0
    }
  } else if (element.type === 'shape') {
    shapeEditorData.value = {
      color: element.color,
      blur: element.blur || 0
    }
  } else if (element.type === 'border') {
    borderEditorData.value = {
      borderColor: element.borderColor,
      borderWidth: element.borderWidth || 2,
      borderRadius: element.borderRadius || 4,
      borderStyle: element.borderStyle || 'solid'
    }
  } else if (element.type === 'table') {
    tableEditorData.value = {
      rows: element.rows,
      cols: element.cols,
      borderColor: element.borderColor,
      borderWidth: element.borderWidth,
      fontSize: element.fontSize || 14,
      fontColor: element.fontColor || '#333333',
      cells: element.cells
    }
  } else {
    textEditorData.value = {
      fontFamily: element.fontFamily,
      fontSize: element.fontSize,
      color: element.color,
      textAlign: element.textAlign,
      bold: element.bold,
      italic: element.italic,
      text: element.text
    }
  }
}

const handleCanvasClick = () => {
  selectedElement.value = null
}

let rafId = null
let resizeRafId = null

const startDrag = (event, element) => {
  event.preventDefault()

  dragData.value = {
    element,
    startX: event.clientX,
    startY: event.clientY,
    startLeft: element.x,
    startTop: element.y
  }

  selectElement(element)
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

const handleDrag = (event) => {
  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  rafId = requestAnimationFrame(() => {
    const { element, startX, startY, startLeft, startTop } = dragData.value
    if (!element) return

    const scale = canvasScale.value / 100
    const dx = (event.clientX - startX) / scale
    const dy = (event.clientY - startY) / scale

    const displayWidth = element.width * (element.scale / 100)
    const displayHeight = element.height * (element.scale / 100)

    const minX = -displayWidth + 1
    const maxX = canvasWidth.value - 1
    const minY = -displayHeight + 1
    const maxY = canvasHeight.value - 1

    element.x = Math.max(minX, Math.min(maxX, startLeft + dx))
    element.y = Math.max(minY, Math.min(maxY, startTop + dy))

    rafId = null
  })
}

const stopDrag = () => {
  dragData.value = {
    element: null,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0
  }
  document.removeEventListener('mousemove', handleDrag)
}

const resizeData = ref({
  element: null,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startScale: 0,
  type: '',
  direction1: '',
  direction2: ''
})

const startResize = (event, element, type, direction1, direction2 = '') => {
  event.preventDefault()
  event.stopPropagation()

  resizeData.value = {
    element,
    startX: event.clientX,
    startY: event.clientY,
    startDisplayWidth: element.width * (element.scale / 100),
    startDisplayHeight: element.height * (element.scale / 100),
    startXPos: element.x,
    startYPos: element.y,
    startScale: element.scale,
    type,
    direction1,
    direction2
  }

  saveHistory(element)
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

const handleResize = (event) => {
  if (resizeRafId) {
    cancelAnimationFrame(resizeRafId)
  }

  resizeRafId = requestAnimationFrame(() => {
    const { element, startX, startY, startDisplayWidth, startDisplayHeight, startXPos, startYPos, startScale, type, direction1, direction2 } = resizeData.value
    if (!element) return

    const scale = canvasScale.value / 100
    const dx = (event.clientX - startX) / scale
    const dy = (event.clientY - startY) / scale

    if (type === 'corner') {
      const ratio = element.height / element.width
      
      let newDisplayWidth = startDisplayWidth
      let newDisplayHeight = startDisplayHeight
      let newX = startXPos
      let newY = startYPos

      if (direction2 === 'right') {
        newDisplayWidth = Math.max(20, startDisplayWidth + dx)
      } else if (direction2 === 'left') {
        newDisplayWidth = Math.max(20, startDisplayWidth - dx)
        newX = startXPos + dx
      }

      if (direction1 === 'bottom') {
        newDisplayHeight = Math.max(20, startDisplayHeight + dy)
      } else if (direction1 === 'top') {
        newDisplayHeight = Math.max(20, startDisplayHeight - dy)
        newY = startYPos + dy
      }

      const widthRatio = newDisplayWidth / startDisplayWidth
      const heightRatio = newDisplayHeight / startDisplayHeight
      
      const actualRatio = Math.min(widthRatio, heightRatio)
      
      if (actualRatio > 0) {
        newDisplayWidth = startDisplayWidth * actualRatio
        newDisplayHeight = startDisplayHeight * actualRatio
      }

      const displayWidthChange = newDisplayWidth - startDisplayWidth
      const displayHeightChange = newDisplayHeight - startDisplayHeight

      if (direction2 === 'left') {
        newX = startXPos + startDisplayWidth - newDisplayWidth
      }
      if (direction1 === 'top') {
        newY = startYPos + startDisplayHeight - newDisplayHeight
      }

      if (element.type === 'shape' && (element.shapeType === 'triangle' || element.shapeType === 'diamond' || element.shapeType === 'star' || element.shapeType === 'heart' || element.shapeType === 'arrow')) {
        element.width = Math.max(10, newDisplayWidth)
        element.height = Math.max(10, newDisplayHeight)
        element.x = newX
        element.y = newY
      } else {
        const newScale = Math.max(10, Math.min(300, (newDisplayWidth / element.width) * 100))
        
        element.scale = newScale
        element.x = newX
        element.y = newY
        
        if (element.type === 'image') {
          imageEditorData.value.scale = newScale
        }
      }
    } else if (type === 'edge') {
      if (direction1 === 'right') {
        const newDisplayWidth = Math.max(20, startDisplayWidth + dx)
        element.width = (newDisplayWidth / (startScale / 100))
      } else if (direction1 === 'left') {
        const newDisplayWidth = Math.max(20, startDisplayWidth - dx)
        element.width = (newDisplayWidth / (startScale / 100))
        element.x = startXPos + dx
      } else if (direction1 === 'bottom') {
        const newDisplayHeight = Math.max(20, startDisplayHeight + dy)
        element.height = (newDisplayHeight / (startScale / 100))
      } else if (direction1 === 'top') {
        const newDisplayHeight = Math.max(20, startDisplayHeight - dy)
        element.height = (newDisplayHeight / (startScale / 100))
        element.y = startYPos + dy
      }
    }

    resizeRafId = null
  })
}

const stopResize = () => {
  resizeData.value = {
    element: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startScale: 0,
    type: '',
    direction1: '',
    direction2: ''
  }
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('mouseup', stopDrag)
}

const applyImageEdit = () => {
  if (selectedElement.value?.type === 'image') {
    const el = selectedElement.value
    el.scale = imageEditorData.value.scale
    el.borderRadius = imageEditorData.value.borderRadius
    el.width = imageEditorData.value.width
    el.height = imageEditorData.value.height
  }
}

const cropImage = (aspectRatio) => {
  let newWidth = imageEditorData.value.width
  let newHeight = imageEditorData.value.height

  switch (aspectRatio) {
    case '1:1':
      newHeight = newWidth
      break
    case '4:3':
      newHeight = (3 / 4) * newWidth
      break
    case '16:9':
      newHeight = (9 / 16) * newWidth
      break
  }

  imageEditorData.value.height = newHeight
  imageEditorData.value.width = newWidth
}

const closeTextEditor = () => {
  if (selectedElement.value?.type === 'text') {
    const el = selectedElement.value
    el.fontFamily = textEditorData.value.fontFamily
    el.fontSize = textEditorData.value.fontSize
    el.color = textEditorData.value.color
    el.textAlign = textEditorData.value.textAlign
    el.bold = textEditorData.value.bold
    el.italic = textEditorData.value.italic
    el.text = textEditorData.value.text
  }
}

const bringToFront = (element) => {
  const maxZIndex = Math.max(...elements.value.map(e => e.zIndex), 0)
  element.zIndex = maxZIndex + 1
}

const moveUp = (element) => {
  const sorted = sortedElements.value
  const currentIndex = sorted.findIndex(e => e.id === element.id)
  if (currentIndex < sorted.length - 1) {
    const currentZIndex = element.zIndex
    const nextElement = sorted[currentIndex + 1]
    element.zIndex = nextElement.zIndex
    nextElement.zIndex = currentZIndex
  }
}

const moveDown = (element) => {
  const sorted = sortedElements.value
  const currentIndex = sorted.findIndex(e => e.id === element.id)
  if (currentIndex > 0) {
    const currentZIndex = element.zIndex
    const prevElement = sorted[currentIndex - 1]
    element.zIndex = prevElement.zIndex
    prevElement.zIndex = currentZIndex
  }
}

const sendToBack = (element) => {
  const minZIndex = Math.min(...elements.value.map(e => e.zIndex), 1)
  element.zIndex = minZIndex - 1
}

const duplicateElement = () => {
  if (!selectedElement.value) return

  const newElement = {
    ...selectedElement.value,
    id: ++idCounter,
    x: selectedElement.value.x + 20,
    y: selectedElement.value.y + 20,
    zIndex: selectedElement.value.zIndex + 1
  }

  elements.value.push(newElement)
  selectElement(newElement)
}

const deleteElement = (element) => {
  const index = elements.value.findIndex(e => e.id === element.id)
  if (index !== -1) {
    elements.value.splice(index, 1)
    if (selectedElement.value?.id === element.id) {
      selectedElement.value = null
    }
  }
}

const exportImage = async () => {
  if (!canvasRef.value) return

  try {
    const wrapper = canvasRef.value.parentElement
    const originalTransform = wrapper.style.transform
    const originalWidth = canvasRef.value.style.width
    const originalHeight = canvasRef.value.style.height
    
    wrapper.style.transform = 'scale(1)'
    canvasRef.value.style.width = `${canvasWidth.value}px`
    canvasRef.value.style.height = `${canvasHeight.value}px`

    const hideElements = document.querySelectorAll('.element-selected, .resize-handle, .crop-overlay')
    hideElements.forEach(el => el.style.display = 'none')

    const scale = 2
    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth.value * scale
    canvas.height = canvasHeight.value * scale
    const ctx = canvas.getContext('2d')
    
    ctx.fillStyle = canvasBgColor.value
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    for (const element of sortedElements.value) {
      if (element.type === 'image') {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = element.src
        })

        const displayWidth = element.width * (element.scale / 100) * scale
        const displayHeight = element.height * (element.scale / 100) * scale

        const cropTop = (element.cropTop || 0) / 100
        const cropBottom = (element.cropBottom || 0) / 100
        const cropLeft = (element.cropLeft || 0) / 100
        const cropRight = (element.cropRight || 0) / 100
        
        const borderRadius = (element.borderRadius || 0) * scale
        
        ctx.save()
        
        ctx.beginPath()
        ctx.roundRect(
          element.x * scale + displayWidth * cropLeft,
          element.y * scale + displayHeight * cropTop,
          displayWidth * (1 - cropLeft - cropRight),
          displayHeight * (1 - cropTop - cropBottom),
          borderRadius
        )
        ctx.clip()
        
        ctx.drawImage(img, 0, 0, img.width, img.height, element.x * scale, element.y * scale, displayWidth, displayHeight)
        ctx.restore()
      } else if (element.type === 'text') {
        ctx.save()
        ctx.font = `${element.bold ? 'bold' : ''} ${element.italic ? 'italic' : ''} ${element.fontSize * scale}px ${element.fontFamily}`
        ctx.fillStyle = element.color
        ctx.textAlign = element.textAlign
        ctx.textBaseline = 'middle'
        
        const displayWidth = element.width * (element.scale / 100) * scale
        const displayHeight = element.height * (element.scale / 100) * scale
        
        const text = element.text || ' '
        const lineHeight = element.fontSize * scale * 1.2
        const maxLines = Math.floor(displayHeight / lineHeight)
        
        const allLines = []
        const manualLines = text.split('\n')
        
        for (const manualLine of manualLines) {
          if (ctx.measureText(manualLine).width <= displayWidth - 8 * scale) {
            allLines.push(manualLine)
          } else {
            let currentLine = ''
            const words = manualLine.split('')
            for (const word of words) {
              const testLine = currentLine + word
              if (ctx.measureText(testLine).width > displayWidth - 8 * scale && currentLine) {
                allLines.push(currentLine)
                currentLine = word
              } else {
                currentLine = testLine
              }
            }
            if (currentLine) {
              allLines.push(currentLine)
            }
          }
        }
        
        const visibleLines = allLines.slice(0, maxLines)
        const totalHeight = visibleLines.length * lineHeight
        const startY = element.y * scale + displayHeight / 2 - totalHeight / 2 + lineHeight / 2
        
        for (let i = 0; i < visibleLines.length; i++) {
          ctx.fillText(visibleLines[i], element.x * scale + displayWidth / 2, startY + i * lineHeight)
        }
        
        ctx.restore()
      } else if (element.type === 'shape') {
        ctx.save()
        
        const displayWidth = element.width * (element.scale / 100) * scale
        const displayHeight = element.height * (element.scale / 100) * scale
        
        const blur = (element.blur || 0) * scale
        if (blur > 0) {
          ctx.filter = `blur(${blur}px)`
          // 下面两行去掉好像也没问题
          ctx.shadowColor = element.color
          ctx.shadowBlur = blur * 2
        }
        
        ctx.fillStyle = element.color
        
        if (element.shapeType === 'circle') {
          ctx.beginPath()
          ctx.arc(element.x * scale + displayWidth / 2, element.y * scale + displayHeight / 2, displayWidth / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (element.shapeType === 'ellipse') {
          ctx.beginPath()
          ctx.ellipse(element.x * scale + displayWidth / 2, element.y * scale + displayHeight / 2, displayWidth / 2, displayHeight / 2, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (element.shapeType === 'rectangle') {
          const borderRadius = (element.borderRadius || 0) * scale
          ctx.beginPath()
          ctx.roundRect(element.x * scale, element.y * scale, displayWidth, displayHeight, borderRadius)
          ctx.fill()
        } else if (element.shapeType === 'triangle') {
          ctx.beginPath()
          ctx.moveTo(element.x * scale + displayWidth / 2, element.y * scale)
          ctx.lineTo(element.x * scale + displayWidth, element.y * scale + displayHeight)
          ctx.lineTo(element.x * scale, element.y * scale + displayHeight)
          ctx.closePath()
          ctx.fill()
        } else if (element.shapeType === 'diamond') {
          ctx.beginPath()
          ctx.moveTo(element.x * scale + displayWidth / 2, element.y * scale)
          ctx.lineTo(element.x * scale + displayWidth, element.y * scale + displayHeight / 2)
          ctx.lineTo(element.x * scale + displayWidth / 2, element.y * scale + displayHeight)
          ctx.lineTo(element.x * scale, element.y * scale + displayHeight / 2)
          ctx.closePath()
          ctx.fill()
        } else if (element.shapeType === 'star') {
          ctx.beginPath()
          const spikes = 5
          const outerRadius = displayWidth / 2
          const innerRadius = outerRadius / 2
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius
            const angle = (Math.PI / spikes) * i - Math.PI / 2
            const x = element.x * scale + displayWidth / 2 + Math.cos(angle) * radius
            const y = element.y * scale + displayHeight / 2 + Math.sin(angle) * radius
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
        } else if (element.shapeType === 'heart') {
          ctx.beginPath()
          const width = displayWidth
          const height = displayHeight
          ctx.moveTo(element.x * scale + width / 2, element.y * scale + height * 0.85)
          ctx.bezierCurveTo(element.x * scale + width, element.y * scale + height * 0.35, element.x * scale + width * 0.2, element.y * scale + height * 0.3, element.x * scale + width * 0.2, element.y * scale + height * 0.5)
          ctx.bezierCurveTo(element.x * scale, element.y * scale + height * 0.55, element.x * scale, element.y * scale + height * 0.75, element.x * scale + width * 0.2, element.y * scale + height * 0.85)
          ctx.lineTo(element.x * scale + width / 2, element.y * scale + height * 0.05)
          ctx.lineTo(element.x * scale + width * 0.8, element.y * scale + height * 0.85)
          ctx.bezierCurveTo(element.x * scale + width, element.y * scale + height * 0.75, element.x * scale + width, element.y * scale + height * 0.55, element.x * scale + width * 0.8, element.y * scale + height * 0.5)
          ctx.bezierCurveTo(element.x * scale + width * 0.8, element.y * scale + height * 0.3, element.x * scale + width * 0, element.y * scale + height * 0.35, element.x * scale + width / 2, element.y * scale + height * 0.85)
          ctx.closePath()
          ctx.fill()
        } else if (element.shapeType === 'arrow') {
          const width = displayWidth
          const height = displayHeight
          const shaftWidth = height * 0.3
          const arrowHeadLen = height * 0.5
          
          ctx.beginPath()
          ctx.moveTo(element.x * scale, element.y * scale + height / 2 - shaftWidth / 2)
          ctx.lineTo(element.x * scale + width - arrowHeadLen, element.y * scale + height / 2 - shaftWidth / 2)
          ctx.lineTo(element.x * scale + width - arrowHeadLen, element.y * scale)
          ctx.lineTo(element.x * scale + width, element.y * scale + height / 2)
          ctx.lineTo(element.x * scale + width - arrowHeadLen, element.y * scale + height)
          ctx.lineTo(element.x * scale + width - arrowHeadLen, element.y * scale + height / 2 + shaftWidth / 2)
          ctx.lineTo(element.x * scale, element.y * scale + height / 2 + shaftWidth / 2)
          ctx.closePath()
          ctx.fill()
        }
        
        ctx.restore()
      } else if (element.type === 'icon') {
        ctx.save()
        const displayWidth = element.width * (element.scale / 100) * scale
        const displayHeight = element.height * (element.scale / 100) * scale
        ctx.strokeStyle = element.color
        ctx.lineWidth = 2 * scale
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        const cx = element.x * scale + displayWidth / 2
        const cy = element.y * scale + displayHeight / 2
        const size = Math.min(displayWidth, displayHeight) * 0.7
        
        const drawIcon = (name) => {
          switch(name) {
            case 'star':
              ctx.beginPath()
              for(let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
                const x = cx + Math.cos(angle) * size / 2
                const y = cy + Math.sin(angle) * size / 2
                if(i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
              }
              ctx.closePath()
              ctx.stroke()
              break
            case 'heart':
              ctx.beginPath()
              ctx.moveTo(cx, cy + size / 4)
              ctx.bezierCurveTo(cx - size / 2, cy - size / 4, cx - size / 2, cy + size / 6, cx, cy + size / 2)
              ctx.bezierCurveTo(cx + size / 2, cy + size / 6, cx + size / 2, cy - size / 4, cx, cy + size / 4)
              ctx.closePath()
              ctx.stroke()
              break
            case 'circle':
              ctx.beginPath()
              ctx.arc(cx, cy, size / 2, 0, Math.PI * 2)
              ctx.stroke()
              break
            case 'triangle':
              ctx.beginPath()
              ctx.moveTo(cx, cy - size / 2)
              ctx.lineTo(cx - size / 2, cy + size / 2)
              ctx.lineTo(cx + size / 2, cy + size / 2)
              ctx.closePath()
              ctx.stroke()
              break
            case 'square':
              ctx.beginPath()
              ctx.rect(cx - size / 2, cy - size / 2, size, size)
              ctx.stroke()
              break
            case 'hexagon':
              ctx.beginPath()
              for(let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3 - Math.PI / 2
                const x = cx + Math.cos(angle) * size / 2
                const y = cy + Math.sin(angle) * size / 2
                if(i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
              }
              ctx.closePath()
              ctx.stroke()
              break
            case 'arrow':
              ctx.beginPath()
              ctx.moveTo(cx - size / 2, cy)
              ctx.lineTo(cx + size / 4, cy)
              ctx.moveTo(cx + size / 4, cy - size / 3)
              ctx.lineTo(cx + size / 2, cy)
              ctx.lineTo(cx + size / 4, cy + size / 3)
              ctx.stroke()
              break
            case 'download':
              ctx.beginPath()
              ctx.moveTo(cx - size / 2, cy + size / 3)
              ctx.lineTo(cx, cy - size / 3)
              ctx.lineTo(cx + size / 2, cy + size / 3)
              ctx.moveTo(cx - size / 3, cy + size / 3)
              ctx.lineTo(cx - size / 3, cy + size / 2)
              ctx.lineTo(cx + size / 3, cy + size / 2)
              ctx.lineTo(cx + size / 3, cy + size / 3)
              ctx.stroke()
              break
            case 'upload':
              ctx.beginPath()
              ctx.moveTo(cx - size / 2, cy - size / 3)
              ctx.lineTo(cx, cy + size / 3)
              ctx.lineTo(cx + size / 2, cy - size / 3)
              ctx.moveTo(cx - size / 3, cy - size / 3)
              ctx.lineTo(cx - size / 3, cy - size / 2)
              ctx.lineTo(cx + size / 3, cy - size / 2)
              ctx.lineTo(cx + size / 3, cy - size / 3)
              ctx.stroke()
              break
            case 'edit':
              ctx.beginPath()
              ctx.rect(cx - size / 2, cy - size / 4, size, size * 0.75)
              ctx.stroke()
              ctx.beginPath()
              ctx.moveTo(cx + size / 4, cy - size / 2)
              ctx.lineTo(cx + size / 2, cy - size / 4)
              ctx.lineTo(cx - size / 4, cy + size / 2)
              ctx.lineTo(cx - size / 2, cy + size / 4)
              ctx.closePath()
              ctx.stroke()
              break
            case 'copy':
              ctx.beginPath()
              ctx.rect(cx - size / 2, cy - size / 2, size, size * 0.8)
              ctx.stroke()
              ctx.beginPath()
              ctx.rect(cx - size / 4, cy + size / 4, size / 2, size * 0.4)
              ctx.stroke()
              break
            case 'settings':
              ctx.beginPath()
              ctx.arc(cx, cy - size / 3, size / 6, 0, Math.PI * 2)
              ctx.stroke()
              ctx.beginPath()
              ctx.arc(cx, cy, size / 6, 0, Math.PI * 2)
              ctx.stroke()
              ctx.beginPath()
              ctx.arc(cx - size / 3 * 0.866, cy + size / 6, size / 6, 0, Math.PI * 2)
              ctx.stroke()
              break
            default:
              ctx.beginPath()
              ctx.arc(cx, cy, size / 2, 0, Math.PI * 2)
              ctx.stroke()
          }
        }
        
        drawIcon(element.iconName)
        ctx.restore()
      } else if (element.type === 'sticker') {
        ctx.save()
        const displayWidth = element.width * (element.scale / 100) * scale
        const displayHeight = element.height * (element.scale / 100) * scale
        ctx.font = `${Math.min(displayWidth, displayHeight) * 0.8}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(element.emoji, element.x * scale + displayWidth / 2, element.y * scale + displayHeight / 2)
        ctx.restore()
      } else if (element.type === 'border') {
        ctx.save()
        const displayWidth = element.width * (element.scale / 100) * scale
        const displayHeight = element.height * (element.scale / 100) * scale
        const borderWidth = (element.borderWidth || 2) * scale
        ctx.strokeStyle = element.borderColor
        ctx.lineWidth = borderWidth
        
        if (element.borderStyle === 'dashed') {
          ctx.setLineDash([8 * scale, 4 * scale])
        } else if (element.borderStyle === 'dotted') {
          ctx.setLineDash([2 * scale, 2 * scale])
        } else if (element.borderStyle === 'double') {
          ctx.setLineDash([borderWidth * 3, borderWidth])
        } else {
          ctx.setLineDash([])
        }
        
        ctx.beginPath()
        ctx.roundRect(element.x * scale, element.y * scale, displayWidth, displayHeight, (element.borderRadius || 0) * scale)
        ctx.stroke()
        ctx.restore()
      } else if (element.type === 'table') {
        ctx.save()
        const displayWidth = element.width * (element.scale / 100) * scale
        const displayHeight = element.height * (element.scale / 100) * scale
        const borderColor = element.borderColor || '#333333'
        const borderWidth = (element.borderWidth || 1) * scale
        const fontColor = element.fontColor || '#333333'
        const fontSize = (element.fontSize || 14) * scale
        ctx.strokeStyle = borderColor
        ctx.fillStyle = fontColor
        ctx.lineWidth = borderWidth
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const cellWidth = displayWidth / element.cols
        const cellHeight = displayHeight / element.rows
        
        ctx.font = `${fontSize}px sans-serif`
        
        const borderRadius = (element.borderRadius || 4) * scale
        ctx.beginPath()
        ctx.roundRect(element.x * scale, element.y * scale, displayWidth, displayHeight, borderRadius)
        ctx.stroke()
        
        for (let row = 0; row < element.rows; row++) {
          for (let col = 0; col < element.cols; col++) {
            const x = element.x * scale + col * cellWidth
            const y = element.y * scale + row * cellHeight
            
            if (col < element.cols - 1) {
              ctx.beginPath()
              ctx.moveTo(x + cellWidth, y)
              ctx.lineTo(x + cellWidth, y + cellHeight)
              ctx.stroke()
            }
            
            if (row < element.rows - 1) {
              ctx.beginPath()
              ctx.moveTo(x, y + cellHeight)
              ctx.lineTo(x + cellWidth, y + cellHeight)
              ctx.stroke()
            }
            
            const cellIndex = row * element.cols + col
            if (element.cells && element.cells[cellIndex] && element.cells[cellIndex].text) {
              const text = element.cells[cellIndex].text
              const maxWidth = cellWidth - 8 * scale
              const lineHeight = fontSize * 1.2
              const maxLines = Math.floor(cellHeight / lineHeight)
              
              const lines = []
              let currentLine = ''
              const words = text.split('')
              
              for (let i = 0; i < words.length; i++) {
                const testLine = currentLine + words[i]
                const testWidth = ctx.measureText(testLine).width
                
                if (testWidth > maxWidth && currentLine) {
                  lines.push(currentLine)
                  currentLine = words[i]
                  if (lines.length >= maxLines) break
                } else {
                  currentLine = testLine
                }
              }
              if (currentLine && lines.length < maxLines) {
                lines.push(currentLine)
              }
              
              const totalTextHeight = lines.length * lineHeight
              const startY = y + cellHeight / 2 - totalTextHeight / 2 + lineHeight / 2
              
              for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], x + cellWidth / 2, startY + i * lineHeight)
              }
            }
          }
        }
        ctx.restore()
      }
    }

    restoreImagesAfterExport()

    hideElements.forEach(el => el.style.display = '')

    const link = document.createElement('a')
    link.download = `小报_${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()

    wrapper.style.transform = originalTransform
    canvasRef.value.style.width = originalWidth
    canvasRef.value.style.height = originalHeight
  } catch (error) {
    console.error('导出失败:', error)
    alert('导出失败，请重试')
  }
}

const restoreImagesAfterExport = () => {
  for (const element of elements.value) {
    if (element.type === 'image' && element.exportSrc) {
      element.src = element.exportSrc
      delete element.exportSrc
    }
  }
}

const parseSvgPath = (ctx, pathData, cx, cy, scale) => {
  const commands = pathData.match(/[MLCQAZ][^MLCQAZ]*/g) || []
  let x = cx, y = cy
  
  for (const cmd of commands) {
    const type = cmd[0]
    const values = cmd.slice(1).trim().split(/[, ]+/).map(v => parseFloat(v))
    
    let i = 0
    while (i < values.length) {
      if (type === 'M' || type === 'm') {
        const px = type === 'M' ? cx + (values[i] - 12) * scale : x + values[i] * scale
        const py = type === 'M' ? cy + (values[i + 1] - 12) * scale : y + values[i + 1] * scale
        ctx.moveTo(px, py)
        x = px
        y = py
        i += 2
      } else if (type === 'L' || type === 'l') {
        const px = type === 'L' ? cx + (values[i] - 12) * scale : x + values[i] * scale
        const py = type === 'L' ? cy + (values[i + 1] - 12) * scale : y + values[i + 1] * scale
        ctx.lineTo(px, py)
        x = px
        y = py
        i += 2
      } else if (type === 'C' || type === 'c') {
        const cp1x = type === 'C' ? cx + (values[i] - 12) * scale : x + values[i] * scale
        const cp1y = type === 'C' ? cx + (values[i + 1] - 12) * scale : y + values[i + 1] * scale
        const cp2x = type === 'C' ? cx + (values[i + 2] - 12) * scale : x + values[i + 2] * scale
        const cp2y = type === 'C' ? cx + (values[i + 3] - 12) * scale : y + values[i + 3] * scale
        const px = type === 'C' ? cx + (values[i + 4] - 12) * scale : x + values[i + 4] * scale
        const py = type === 'C' ? cx + (values[i + 5] - 12) * scale : y + values[i + 5] * scale
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py)
        x = px
        y = py
        i += 6
      } else if (type === 'A' || type === 'a') {
        const rx = values[i] * scale
        const ry = values[i + 1] * scale
        const rotation = values[i + 2]
        const largeArc = values[i + 3]
        const sweep = values[i + 4]
        const px = type === 'A' ? cx + (values[i + 5] - 12) * scale : x + values[i + 5] * scale
        const py = type === 'A' ? cy + (values[i + 6] - 12) * scale : y + values[i + 6] * scale
        ctx.arc(x, y, rx, 0, Math.PI * 2)
        x = px
        y = py
        i += 7
      } else if (type === 'Z' || type === 'z') {
        ctx.closePath()
        i += 0
      }
    }
  }
}
</script>
