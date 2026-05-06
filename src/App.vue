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
            <span>添加图片</span>
          </button>
          <button
            @click="addText"
            class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Type class="w-5 h-5" />
            <span>添加文字</span>
          </button>
          <div class="relative">
            <button
              @click="showShapeMenu = !showShapeMenu"
              class="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Square class="w-5 h-5" />
              <span>添加形状</span>
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
          <button
            @click="exportImage"
            class="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Download class="w-5 h-5" />
            <span>导出图片</span>
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <aside class="w-64 bg-white border-r border-gray-200 p-4">
        <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Layers class="w-5 h-5" />
          图层管理
        </h3>
        <div v-if="elements.length === 0" class="text-gray-400 text-sm">
          暂无元素，请添加图片或文字
        </div>
        <div v-else class="space-y-2 max-h-96 overflow-y-auto">
          <div
            v-for="(element, index) in elements"
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
            <Square v-else class="w-5 h-5 text-gray-600" />
            <span class="text-sm flex-1 truncate">
              {{ element.type === 'image' ? '图片' : (element.type === 'text' ? '文字' : '形状') }} {{ index + 1 }}
            </span>
            <button
              @click.stop="bringToFront(element)"
              class="p-1 hover:bg-gray-200 rounded"
              title="置于顶层"
            >
              <ChevronUp class="w-4 h-4" />
            </button>
            <button
              @click.stop="sendToBack(element)"
              class="p-1 hover:bg-gray-200 rounded"
              title="置于底层"
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

        <div v-if="selectedElement" class="mt-6 border-t border-gray-200 pt-4">
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
            <div>
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
              <input
                type="color"
                v-model="textEditorData.color"
                @input="updateTextElement"
                class="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
              />
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
                  class="w-12 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  v-model="shapeEditorData.color"
                  @input="updateShapeElement"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
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

        <div class="mt-6">
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
                  class="w-12 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  v-model="defaultSettings.textColor"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
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
              <input
                type="color"
                v-model="canvasBgColor"
                class="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
              />
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
              <div v-if="element.type === 'image'" class="w-full h-full relative overflow-hidden" :style="{ borderRadius: element.borderRadius + 'px' }">
                <img
                  v-if="selectedElement?.id === element.id && hasCrop(element)"
                  :src="element.src"
                  class="absolute inset-0 w-full h-full object-cover opacity-40"
                  draggable="false"
                />
                <div 
                  class="absolute inset-0 overflow-hidden"
                  :style="getCropWrapperStyle(element)"
                >
                  <img
                    :src="element.src"
                    class="absolute"
                    :style="getCroppedImageStyle(element)"
                    draggable="false"
                  />
                </div>
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
                  <div 
                    :style="getShapeInnerStyle(element)"
                  ></div>
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
  Triangle, Star, Heart, ArrowRight, Hexagon
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
const shapeEditorData = ref({
  color: '#3b82f6',
  blur: 0
})

const defaultSettings = ref({
  imageBorderRadius: 0,
  textFontSize: 24,
  textColor: '#333333'
})

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
      if (el.bold !== textEditorData.value.bold) {
        saveHistory(el)
        el.bold = !el.bold
        textEditorData.value.bold = el.bold
      }
    } else if (style === 'italic') {
      if (el.italic !== textEditorData.value.italic) {
        saveHistory(el)
        el.italic = !el.italic
        textEditorData.value.italic = el.italic
      }
    }
  }
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

const getCropWrapperStyle = (element) => {
  const cropTop = element.cropTop || 0
  const cropBottom = element.cropBottom || 0
  const cropLeft = element.cropLeft || 0
  const cropRight = element.cropRight || 0
  const borderRadius = element.borderRadius || 0
  
  if (cropTop === 0 && cropBottom === 0 && cropLeft === 0 && cropRight === 0) {
    return { borderRadius: borderRadius + 'px' }
  }
  
  const visibleWidth = 100 - cropLeft - cropRight
  const visibleHeight = 100 - cropTop - cropBottom
  
  return {
    left: cropLeft + '%',
    top: cropTop + '%',
    width: visibleWidth + '%',
    height: visibleHeight + '%',
    borderRadius: borderRadius + 'px'
  }
}

const getCroppedImageStyle = (element) => {
  const cropTop = element.cropTop || 0
  const cropBottom = element.cropBottom || 0
  const cropLeft = element.cropLeft || 0
  const cropRight = element.cropRight || 0
  
  if (cropTop === 0 && cropBottom === 0 && cropLeft === 0 && cropRight === 0) {
    return {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }
  
  const visibleWidth = 100 - cropLeft - cropRight
  const visibleHeight = 100 - cropTop - cropBottom
  
  if (visibleWidth <= 0 || visibleHeight <= 0) {
    return {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }
  
  const scaleX = 100 / visibleWidth
  const scaleY = 100 / visibleHeight
  const translateX = -cropLeft / visibleWidth * 100
  const translateY = -cropTop / visibleHeight * 100
  
  return {
    transform: `translate(${translateX}%, ${translateY}%) scale(${scaleX}, ${scaleY})`,
    transformOrigin: 'top left',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
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
    style.clipPath = `polygon(50% 75%, 25% 45%, 10% 45%, 20% 65%, 15% 85%, 50% 100%, 85% 85%, 80% 65%, 90% 45%, 75% 45%)`
  } else if (element.shapeType === 'arrow') {
    const w = element.width
    const h = element.height
    const arrowLen = h * 0.5
    style.clipPath = `polygon(0% 50%, ${w - arrowLen}% 50%, ${w - arrowLen}% ${25}%, 100% 50%, ${w - arrowLen}% ${75}%, ${w - arrowLen}% 50%)`
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

      const newElement = {
        id: ++idCounter,
        type: 'image',
        src: e.target.result,
        x: (canvasWidth.value - width) / 2,
        y: (canvasHeight.value - height) / 2,
        width,
        height,
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

    const canvas = await html2canvas(canvasRef.value, {
      scale: 1,
      width: canvasWidth.value,
      height: canvasHeight.value,
      backgroundColor: canvasBgColor.value
    })

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
</script>
