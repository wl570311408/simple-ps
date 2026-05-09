<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm border-b border-gray-200 w-full">
      <div class="w-full px-3 py-2 flex items-center justify-between">
        <div class="flex items-center gap-2 flex-shrink-0">
          <LayoutGrid class="w-6 h-6 text-blue-600" />
          <h1 class="text-lg font-bold text-gray-800 lg:text-xl hidden lg:block">{{ t('app.title') }}</h1>
        </div>
        <div class="flex items-center gap-1 ml-auto">
          <button
            @click="addImage"
            :title="t('toolbar.image')"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ImagePlus class="w-4 h-4" />
            <span class="hidden md:inline text-sm">{{ t('toolbar.image') }}</span>
          </button>
          <button
            @click="addText"
            :title="t('toolbar.text')"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Type class="w-4 h-4" />
            <span class="hidden md:inline text-sm">{{ t('toolbar.text') }}</span>
          </button>
          <div class="relative">
            <button
              @click="toggleMenu('shape')"
              :title="t('toolbar.shape')"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Triangle class="w-4 h-4" />
              <span class="hidden md:inline text-sm">{{ t('toolbar.shape') }}</span>
            </button>
            <div v-if="showShapeMenu" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-4 gap-1 min-w-[200px]">
              <div class="absolute -top-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-300"></div>
              <div class="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
            <button
              @click="addShape('rectangle'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <Square class="w-4 h-4" />
              <span>{{ t('shape.rectangle') }}</span>
            </button>
            <button
              @click="addShape('circle'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <Circle class="w-4 h-4" />
              <span>{{ t('shape.circle') }}</span>
            </button>
            <button
              @click="addShape('ellipse'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <span class="w-5 h-4 flex items-center justify-center">
                <svg viewBox="0 0 24 14" class="w-full h-auto" style="max-height: 16px;"><ellipse cx="12" cy="7" rx="11" ry="6" fill="currentColor"/></svg>
              </span>
              <span class="whitespace-nowrap">{{ t('shape.ellipse') }}</span>
            </button>
            <button
              @click="addShape('triangle'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <Triangle class="w-4 h-4" />
              <span class="whitespace-nowrap">{{ t('shape.triangle') }}</span>
            </button>
            <button
              @click="addShape('diamond'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <span class="w-4 h-4 flex items-center justify-center text-lg">◆</span>
              <span>{{ t('shape.diamond') }}</span>
            </button>
            <button
              @click="addShape('star'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <Star class="w-4 h-4" />
              <span>Star</span>
            </button>
            <button
              @click="addShape('heart'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <Heart class="w-4 h-4" />
              <span>{{ t('shape.heart') }}</span>
            </button>
            <button
              @click="addShape('arrow'); showShapeMenu = false"
              class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
            >
              <ArrowRight class="w-4 h-4" />
              <span>{{ t('shape.arrow') }}</span>
            </button>
            </div>
          </div>
          <div class="relative">
            <button
              @click="toggleMenu('icon')"
              :title="t('toolbar.icon')"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Star class="w-4 h-4" />
              <span class="hidden md:inline text-sm">{{ t('toolbar.icon') }}</span>
            </button>
            <div v-if="showIconMenu" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-10 gap-1 min-w-[500px]">
                <div class="absolute -top-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-300"></div>
              <div class="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
              <button v-for="icon in iconList" :key="icon.name"
                @click="addIcon(icon.name); showIconMenu = false"
                class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
              >
                <component :is="icon.component" class="w-5 h-5" />
                <span class="whitespace-nowrap overflow-hidden text-ellipsis max-w-[40px]">{{ t(icon.label) }}</span>
              </button>
            </div>
          </div>
          <div class="relative">
            <button
              @click="toggleMenu('sticker')"
              :title="t('toolbar.sticker')"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <Heart class="w-4 h-4" />
              <span class="hidden md:inline text-sm">{{ t('toolbar.sticker') }}</span>
            </button>
            <div v-if="showStickerMenu" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-10 gap-1 min-w-[500px]">
                <div class="absolute -top-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-300"></div>
              <div class="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
              <button v-for="sticker in stickerList" :key="sticker.name"
                @click="addSticker(sticker); showStickerMenu = false"
                class="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs min-w-[48px]"
              >
                <span class="text-2xl">{{ sticker.emoji }}</span>
                <span class="whitespace-nowrap overflow-hidden text-ellipsis max-w-[40px]">{{ t(sticker.label) }}</span>
              </button>
            </div>
          </div>
          <div class="relative">
            <button
              @click="toggleMenu('other')"
              :title="t('toolbar.other')"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <MoreHorizontal class="w-4 h-4" />
              <span class="hidden md:inline text-sm">{{ t('toolbar.other') }}</span>
            </button>
            <div v-if="showOtherMenu" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 grid grid-cols-2 gap-1 min-w-[160px]">
              <button
                @click="addBorder({ name: 'solid', style: 'solid', color: '#333333', radius: 4 }); showOtherMenu = false"
                class="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded text-xs"
              >
                <Square class="w-5 h-5" />
                <span>{{ t('toolbar.border') }}</span>
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
                <span>{{ t('toolbar.table') }}</span>
              </button>
              <button
                @click="addQRCode(); showOtherMenu = false"
                class="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded text-xs"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <rect x="6" y="6" width="4" height="4"/>
                  <rect x="14" y="6" width="4" height="4"/>
                  <rect x="6" y="14" width="4" height="4"/>
                  <rect x="16" y="16" width="2" height="2"/>
                  <rect x="6" y="12" width="2" height="2"/>
                  <rect x="12" y="6" width="2" height="2"/>
                </svg>
                <span>{{ t('toolbar.qrcode') }}</span>
              </button>
            </div>
          </div>
          <button
            @click="exportImage"
            :title="t('toolbar.export')"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Download class="w-4 h-4" />
            <span class="hidden md:inline text-sm">{{ t('toolbar.export') }}</span>
          </button>
          <div class="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg">
            <Globe class="w-3 h-3 text-gray-600" />
            <select
              :value="locale"
              @change="changeLanguage($event.target.value)"
              class="px-1.5 py-0.5 text-xs bg-transparent hover:bg-gray-100 cursor-pointer border-none outline-none focus:outline-none"
            >
              <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
                {{ lang.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <aside class="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-4">
        <div class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Layers class="w-5 h-5" />
            {{ t('app.layers') }}
          </h3>
          <div v-if="elements.length === 0" class="text-gray-400 text-sm">
            {{ t('app.noElements') }}
          </div>
          <div v-else class="space-y-2 max-h-80 overflow-y-auto">
            <div
              v-for="(element, index) in sortedElements"
              :key="element.id"
              :class="[
                'flex items-center gap-1.5 p-1.5 rounded-lg cursor-pointer transition-colors',
                selectedElement?.id === element.id
                  ? 'bg-blue-50 border border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              ]"
            >
              <div class="flex flex-col justify-between h-full">
                <button
                  @click.stop="toggleVisibility(element)"
                  class="p-0.5 hover:bg-gray-200 rounded"
                  :title="element.visible ? t('layer.hide') : t('layer.show')"
                >
                  <Eye v-if="element.visible !== false" class="w-3 h-3 text-gray-600" />
                  <EyeOff v-else class="w-3 h-3 text-gray-400" />
                </button>
                <button
                  v-if="element.visible !== false"
                  @click.stop="toggleLock(element)"
                  class="p-0.5 hover:bg-gray-200 rounded"
                  :title="element.locked ? t('layer.unlock') : t('layer.lock')"
                >
                  <Unlock v-if="element.locked !== true" class="w-3 h-3 text-gray-600" />
                  <Lock v-else class="w-3 h-3 text-gray-400" />
                </button>
              </div>
              <div @click="selectElement(element)" class="flex-1 flex items-center gap-1.5">
                <ImageIcon v-if="element.type === 'image'" :size="16" class="text-gray-600" />
              <Type v-else-if="element.type === 'text'" class="w-4 h-4 text-gray-600" />
              <Triangle v-else-if="element.type === 'shape'" class="w-4 h-4 text-gray-600" :style="{ color: element.color }" />
              <Star v-else-if="element.type === 'icon'" class="w-4 h-4 text-gray-600" />
              <Heart v-else-if="element.type === 'sticker'" class="w-4 h-4 text-pink-500" />
              <Square v-else-if="element.type === 'border'" class="w-4 h-4 text-teal-500" />
              <svg v-else-if="element.type === 'table'" class="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
              <svg v-else-if="element.type === 'qrcode'" class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <rect x="6" y="6" width="4" height="4"/>
                <rect x="14" y="6" width="4" height="4"/>
                <rect x="6" y="14" width="4" height="4"/>
                <rect x="16" y="16" width="2" height="2"/>
                <rect x="6" y="12" width="2" height="2"/>
                <rect x="12" y="6" width="2" height="2"/>
              </svg>
              <Circle v-else class="w-4 h-4 text-gray-600" />
              <span class="text-xs flex-1 truncate" :style="element.type === 'shape' ? { color: element.color } : {}">
                {{ getLayerName(element) }}
              </span>
              <div class="flex flex-col justify-between h-full">
                <button
                  @click.stop="moveUp(element)"
                  class="p-0.5 hover:bg-gray-200 rounded"
                  :title="t('layer.moveUp')"
                >
                  <ChevronUp class="w-3 h-3 text-gray-600" />
                </button>
                <button
                  @click.stop="moveDown(element)"
                  class="p-0.5 hover:bg-gray-200 rounded"
                  :title="t('layer.moveDown')"
                >
                  <ChevronDown class="w-3 h-3 text-gray-600" />
                </button>
              </div>
              <button
                @click.stop="deleteElement(element)"
                class="p-0.5 hover:bg-red-100 text-red-500 rounded"
                :title="t('common.delete')"
              >
                <Trash2 class="w-3 h-3" />
              </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedElement" class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Edit3 class="w-5 h-5" />
            {{ t('app.edit') }}
          </h3>
          
          <div v-if="selectedElement.type === 'image'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-2">{{ t('image.crop') }} <span class="text-xs text-gray-400">({{ t('image.unit') }})</span></label>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">{{ t('image.cropTop') }}</label>
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
                  <label class="block text-xs text-gray-500 mb-1">{{ t('image.cropBottom') }}</label>
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
                  <label class="block text-xs text-gray-500 mb-1">{{ t('image.cropLeft') }}</label>
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
                  <label class="block text-xs text-gray-500 mb-1">{{ t('image.cropRight') }}</label>
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
                <label class="block text-sm text-gray-600 mb-1">{{ t('image.borderRadius') }}: {{ imageEditorData.borderRadius }}px</label>
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
              >{{ t('common.reset') }}</button>
            </div>
            <div class="flex gap-1.5 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.undo') }}</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.redo') }}</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-2 py-1.5 border rounded-lg hover:bg-gray-50 text-xs"
              >{{ t('common.duplicate') }}</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-2 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-xs"
              >{{ t('common.delete') }}</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'border'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('border.color') }}</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('border.width') }}: {{ borderEditorData.borderWidth }}px</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('border.radius') }}: {{ borderEditorData.borderRadius }}px</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('border.style') }}</label>
              <select
                v-model="borderEditorData.borderStyle"
                @change="updateBorderElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="solid">{{ t('border.solid') }}</option>
                <option value="dashed">{{ t('border.dashed') }}</option>
                <option value="dotted">{{ t('border.dotted') }}</option>
                <option value="double">{{ t('border.double') }}</option>
              </select>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <label class="block text-sm text-gray-600 mb-1">{{ t('border.text') }}</label>
              <textarea
                v-model="borderEditorData.text"
                @input="updateBorderElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                :placeholder="t('border.textPlaceholder')"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('border.fontFamily') }}</label>
              <select
                v-model="borderEditorData.fontFamily"
                @change="updateBorderElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <optgroup :label="t('font.chinese')">
                  <option v-for="font in availableFonts.chinese" :key="font.name" :value="font.name">
                    {{ font.labelKey ? t(font.labelKey) : font.label }}
                  </option>
                </optgroup>
                <optgroup :label="t('font.english')">
                  <option v-for="font in availableFonts.english" :key="font.name" :value="font.name">
                    {{ font.labelKey ? t(font.labelKey) : font.label }}
                  </option>
                </optgroup>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('border.fontSize') }}: {{ borderEditorData.fontSize }}px</label>
                <input
                  type="number"
                  v-model.number="borderEditorData.fontSize"
                  min="8"
                  max="48"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  @input="updateBorderElement"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('border.fontColor') }}</label>
                <input
                  type="color"
                  v-model="borderEditorData.fontColor"
                  @input="updateBorderElement"
                  class="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                />
              </div>
            </div>
          </div>
          <div v-else-if="selectedElement.type === 'table'" class="space-y-4">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('table.rows') }}: {{ tableEditorData.rows }}</label>
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
                <label class="block text-sm text-gray-600 mb-1">{{ t('table.cols') }}: {{ tableEditorData.cols }}</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('table.borderColor') }}</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('table.borderWidth') }}: {{ tableEditorData.borderWidth }}px</label>
              <input
                type="range"
                v-model.number="tableEditorData.borderWidth"
                min="1"
                max="10"
                class="w-full"
                @input="updateTableElement"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('table.fontFamily') }}</label>
              <select
                v-model="tableEditorData.fontFamily"
                @change="updateTableElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <optgroup :label="t('font.chinese')">
                  <option v-for="font in availableFonts.chinese" :key="font.name" :value="font.name">
                    {{ font.labelKey ? t(font.labelKey) : font.label }}
                  </option>
                </optgroup>
                <optgroup :label="t('font.english')">
                  <option v-for="font in availableFonts.english" :key="font.name" :value="font.name">
                    {{ font.labelKey ? t(font.labelKey) : font.label }}
                  </option>
                </optgroup>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('table.fontSize') }}: {{ tableEditorData.fontSize }}px</label>
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
                <label class="block text-sm text-gray-600 mb-1">{{ t('table.fontColor') }}</label>
                <input
                  type="color"
                  v-model="tableEditorData.fontColor"
                  @input="updateTableElement"
                  class="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-2">{{ t('table.editCells') }}</label>
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
                          :placeholder="t('table.cell')"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex gap-1.5 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.undo') }}</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.redo') }}</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-2 py-1.5 border rounded-lg hover:bg-gray-50 text-xs"
              >{{ t('common.duplicate') }}</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-2 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-xs"
              >{{ t('common.delete') }}</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'text'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('text.fontFamily') }}</label>
              <select
                v-model="textEditorData.fontFamily"
                @change="updateTextElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <optgroup :label="t('font.chinese')">
                  <option v-for="font in availableFonts.chinese" :key="font.name" :value="font.name">
                    {{ font.labelKey ? t(font.labelKey) : font.label }}
                  </option>
                </optgroup>
                <optgroup :label="t('font.english')">
                  <option v-for="font in availableFonts.english" :key="font.name" :value="font.name">
                    {{ font.labelKey ? t(font.labelKey) : font.label }}
                  </option>
                </optgroup>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('text.fontSize') }}: {{ textEditorData.fontSize }}px</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('text.color') }}</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('text.textAlign') }}</label>
              <div class="flex gap-2">
                <button
                  @click="updateTextAlign('left')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm',
                    textEditorData.textAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >{{ t('text.left') }}</button>
                <button
                  @click="updateTextAlign('center')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm',
                    textEditorData.textAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >{{ t('text.center') }}</button>
                <button
                  @click="updateTextAlign('right')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm',
                    textEditorData.textAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >{{ t('text.right') }}</button>
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('text.style') }}</label>
              <div class="flex gap-2">
                <button
                  @click="updateTextStyle('bold')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm font-bold',
                    textEditorData.bold ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >{{ t('text.bold') }}</button>
                <button
                  @click="updateTextStyle('italic')"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg text-sm italic',
                    textEditorData.italic ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                  ]"
                >{{ t('text.italic') }}</button>
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('text.content') }}</label>
              <textarea
                v-model="textEditorData.text"
                @input="updateTextElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                rows="3"
              ></textarea>
            </div>
            <div class="flex gap-1.5 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.undo') }}</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.redo') }}</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-2 py-1.5 border rounded-lg hover:bg-gray-50 text-xs"
              >{{ t('common.duplicate') }}</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-2 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-xs"
              >{{ t('common.delete') }}</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'shape'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('shape.color') }}</label>
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
                <label class="block text-sm text-gray-600 mb-1">{{ t('shape.width') }}</label>
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
                <label class="block text-sm text-gray-600 mb-1">{{ t('shape.height') }}</label>
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
            <div v-if="selectedElement?.shapeType === 'rectangle'" class="space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">{{ t('shape.borderRadius') }}</label>
                  <input
                    type="number"
                    :value="selectedElement?.borderRadius || 0"
                    @input="updateShapeBorderRadius($event, selectedElement)"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">{{ t('shape.opacity') }}: {{ shapeEditorData.opacity }}%</label>
                  <input
                    type="range"
                    v-model.number="shapeEditorData.opacity"
                    min="0"
                    max="100"
                    class="w-full"
                    @input="updateShapeElement"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">{{ t('shape.feather') }}: {{ shapeEditorData.blur }}px</label>
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
            </div>
            <div v-else-if="selectedElement?.shapeType === 'circle'" class="space-y-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('shape.radius') }}</label>
                <input
                  type="number"
                  :value="Math.round(selectedElement.width / 2)"
                  @input="updateShapeRadius($event, selectedElement)"
                  class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  min="1"
                  max="4999"
                />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">{{ t('shape.opacity') }}: {{ shapeEditorData.opacity }}%</label>
                  <input
                    type="range"
                    v-model.number="shapeEditorData.opacity"
                    min="0"
                    max="100"
                    class="w-full"
                    @input="updateShapeElement"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">{{ t('shape.feather') }}: {{ shapeEditorData.blur }}px</label>
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
            </div>
            <div v-else class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('shape.opacity') }}: {{ shapeEditorData.opacity }}%</label>
                <input
                  type="range"
                  v-model.number="shapeEditorData.opacity"
                  min="0"
                  max="100"
                  class="w-full"
                  @input="updateShapeElement"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('shape.feather') }}: {{ shapeEditorData.blur }}px</label>
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
            <div class="flex gap-1.5 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.undo') }}</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.redo') }}</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-2 py-1.5 border rounded-lg hover:bg-gray-50 text-xs"
              >{{ t('common.duplicate') }}</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-2 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-xs"
              >{{ t('common.delete') }}</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'qrcode'" class="space-y-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('qrcode.content') }}</label>
              <textarea
                v-model="qrCodeEditorData.content"
                @input="updateQRCodeElement"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                rows="3"
                :placeholder="t('qrcode.placeholder')"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-2">{{ t('qrcode.size') }}: {{ qrCodeEditorData.size }}px</label>
              <input
                type="range"
                v-model.number="qrCodeEditorData.size"
                @input="updateQRCodeElement"
                min="50"
                max="300"
                class="w-full"
              />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('qrcode.foregroundColor') }}</label>
                <input
                  type="color"
                  v-model="qrCodeEditorData.foregroundColor"
                  @input="updateQRCodeElement"
                  class="w-full h-8 rounded cursor-pointer border border-gray-300"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('qrcode.backgroundColor') }}</label>
                <input
                  type="color"
                  v-model="qrCodeEditorData.backgroundColor"
                  @input="updateQRCodeElement"
                  class="w-full h-8 rounded cursor-pointer border border-gray-300"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-2">{{ t('qrcode.borderWidth') }}: {{ qrCodeEditorData.borderWidth }}px</label>
              <input
                type="range"
                v-model.number="qrCodeEditorData.borderWidth"
                @input="updateQRCodeElement"
                min="0"
                max="20"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-2">{{ t('qrcode.borderStyle') }}</label>
              <div class="flex items-center gap-2">
                <select
                  v-model="qrCodeEditorData.borderStyle"
                  @change="updateQRCodeElement"
                  class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="none">{{ t('qrcode.none') }}</option>
                  <option value="solid">{{ t('qrcode.solid') }}</option>
                  <option value="dashed">{{ t('qrcode.dashed') }}</option>
                  <option value="dotted">{{ t('qrcode.dotted') }}</option>
                </select>
                <input
                  type="color"
                  v-model="qrCodeEditorData.borderColor"
                  @input="updateQRCodeElement"
                  class="w-10 h-8 rounded cursor-pointer border border-gray-300"
                />
              </div>
            </div>
            <div class="flex gap-1.5 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.undo') }}</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.redo') }}</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-2 py-1.5 border rounded-lg hover:bg-gray-50 text-xs"
              >{{ t('common.duplicate') }}</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-2 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-xs"
              >{{ t('common.delete') }}</button>
            </div>
          </div>

          <div v-else-if="selectedElement.type === 'icon'" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('icon.color') }}</label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="iconEditorData.color"
                  @input="updateIconElement"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex-shrink-0"
                />
                <input
                  type="text"
                  v-model="iconEditorData.color"
                  @input="updateIconElement"
                  class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div class="flex gap-1.5 pt-2">
              <button
                @click="undo"
                :disabled="historyIndex <= 0"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.undo') }}</button>
              <button
                @click="redo"
                :disabled="historyIndex >= history.length - 1"
                :class="[
                  'flex-1 px-2 py-1.5 border rounded-lg text-xs',
                  historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >{{ t('common.redo') }}</button>
              <button
                @click="duplicateElement"
                class="flex-1 px-2 py-1.5 border rounded-lg hover:bg-gray-50 text-xs"
              >{{ t('common.duplicate') }}</button>
              <button
                @click="deleteElement(selectedElement)"
                class="flex-1 px-2 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-xs"
              >{{ t('common.delete') }}</button>
            </div>
          </div>
        </div>

        <div v-if="!selectedElement" class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Palette class="w-5 h-5" />
            {{ t('canvas.settings') }}
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('canvas.preset') }}</label>
              <select
                v-model="selectedPreset"
                :disabled="canvasBgType === 'image' && canvasBgImage"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                :class="{ 'opacity-50 cursor-not-allowed': canvasBgType === 'image' && canvasBgImage }"
                @change="applyPreset"
              >
                <option value="">{{ t('canvas.custom') }}</option>
                <option value="a4">{{ t('canvas.a4') }}</option>
                <option value="a5">{{ t('canvas.a5') }}</option>
                <option value="a6">A6 (105 × 148mm)</option>
                <option value="letter">Letter (8.5 × 11in)</option>
                <option value="legal">Legal (8.5 × 14in)</option>
                <option value="poster">{{ t('canvas.poster') }}</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('canvas.width') }}</label>
                <input
                  type="number"
                  v-model.number="canvasWidth"
                  :disabled="canvasBgType === 'image' && canvasBgImage"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  :class="{ 'opacity-50 cursor-not-allowed bg-gray-100': canvasBgType === 'image' && canvasBgImage }"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">{{ t('canvas.height') }}</label>
                <input
                  type="number"
                  v-model.number="canvasHeight"
                  :disabled="canvasBgType === 'image' && canvasBgImage"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  :class="{ 'opacity-50 cursor-not-allowed bg-gray-100': canvasBgType === 'image' && canvasBgImage }"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('canvas.background') }}</label>
              <div class="flex gap-2">
                <button
                  @click="canvasBgType = 'color'"
                  :class="[
                    'flex-1 py-2 px-3 rounded-lg text-sm transition-colors',
                    canvasBgType === 'color' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ t('canvas.color') }}
                </button>
                <button
                  @click="switchToImageBackground"
                  :class="[
                    'flex-1 py-2 px-3 rounded-lg text-sm transition-colors',
                    canvasBgType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ t('canvas.image') }}
                </button>
              </div>
            </div>
            <div v-if="canvasBgType === 'color'">
              <label class="block text-sm text-gray-600 mb-1">{{ t('canvas.bgColor') }}</label>
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
              <label class="block text-sm text-gray-600 mb-1">{{ t('canvas.bgImage') }}</label>
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
                  {{ canvasBgImage ? t('canvas.change') : t('canvas.upload') }}
                </button>
                <button
                  v-if="canvasBgImage"
                  @click="canvasBgImage = ''"
                  class="w-full mt-2 py-2 px-3 border border-red-300 rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  {{ t('canvas.remove') }}
                </button>
                <div class="mt-3">
                  <label class="block text-sm text-gray-600 mb-1">{{ t('canvas.fillMode') }}</label>
                  <select
                    v-model="canvasBgFillMode"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="resize">{{ t('canvas.resize') }}</option>
                    <option value="cover">{{ t('canvas.cover') }}</option>
                    <option value="stretch">{{ t('canvas.stretch') }}</option>
                    <option value="actual">{{ t('canvas.actual') }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!selectedElement" class="bg-white rounded-lg border border-gray-200 p-3">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Settings class="w-5 h-5" />
            {{ t('defaults.title') }}
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('defaults.imageBorderRadius') }}: {{ defaultSettings.imageBorderRadius }}px</label>
              <input
                type="range"
                v-model.number="defaultSettings.imageBorderRadius"
                min="0"
                max="50"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('defaults.textFontSize') }}: {{ defaultSettings.textFontSize }}px</label>
              <input
                type="range"
                v-model.number="defaultSettings.textFontSize"
                min="12"
                max="72"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ t('defaults.textColor') }}</label>
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

      <main class="flex-1 p-6 overflow-hidden pb-12">
        <div class="canvas-container flex items-center justify-center h-[calc(100vh-200px)] overflow-auto">
          <div
            class="canvas-wrapper"
            :style="{ transform: `scale(${canvasScale / 100})`, transformOrigin: 'center center' }"
          >
            <div
              ref="canvasRef"
              :style="getCanvasStyle()"
              class="relative shadow-lg overflow-hidden border border-gray-300"
              @click="handleCanvasClick"
            >
            <div
              v-for="element in sortedElements"
              v-show="element.visible !== false"
              :key="element.id"
              :class="[
                'absolute cursor-move select-none',
                selectedElement?.id === element.id ? 'element-selected' : '',
                element.locked ? 'cursor-not-allowed' : ''
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
              <div v-else-if="element.type === 'qrcode'" class="w-full h-full flex items-center justify-center bg-white">
                <img 
                  :src="element.qrDataUrl" 
                  :key="element.id + '-' + element.content + '-' + (element.qrKey || 0)"
                  class="max-w-full max-h-full object-contain"
                  :alt="t('common.qrcodeAlt')"
                />
              </div>
              <div v-else-if="element.type === 'sticker'" class="w-full h-full flex items-center justify-center" :style="{ fontSize: `${Math.min(element.width, element.height) * (element.scale / 100) * 0.8}px` }">
                {{ element.emoji }}
              </div>
              <div 
                v-else-if="element.type === 'border'" 
                class="w-full h-full flex items-center justify-center overflow-hidden"
                :style="{ 
                  border: `${element.borderWidth || 2}px ${element.borderStyle} ${element.borderColor}`,
                  borderRadius: element.borderRadius + 'px'
                }"
              >
                <div v-if="element.text" class="text-center p-2" :style="{ fontFamily: element.fontFamily || 'Microsoft YaHei', fontSize: `${element.fontSize || 14}px`, color: element.fontColor || '#333333' }">
                  {{ element.text }}
                </div>
                <span v-else class="text-gray-400 text-sm">{{ t('common.addContent') }}</span>
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
                        fontFamily: element.fontFamily || 'Microsoft YaHei',
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

    <footer class="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-2 text-sm flex items-center justify-center relative">
      <span>作者：吴亮</span>
      <span class="mx-2">|</span>
      <span>邮箱：570311408@qq.com</span>
      <span class="mx-2">|</span>
      <span>版本：1.0.0</span>
      <span class="mx-2">|</span>
      <span>© 2026 版权所有</span>
      
      <button 
        @click="showBuildTime = !showBuildTime"
        class="absolute right-2 w-6 h-6 bg-transparent border-none rounded flex items-center justify-center opacity-[0.01]"
        title="显示/隐藏版本发布时间"
      >
        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      <div v-if="showBuildTime" class="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
        {{ buildTime }}
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, createVNode, render } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  LayoutGrid, ImagePlus, Type, Download, Layers, Globe,
  ChevronUp, ChevronDown, Trash2, Palette, X,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  Edit3, Copy, Image as ImageIcon, Upload, Square, Circle, Settings,
  Triangle, Star, Heart, ArrowRight, Hexagon, MoreHorizontal,
  Home, Mail, Phone, MapPin, Clock, Calendar, Camera, Music,
  Video, Book, FileText, Folder, Link, ExternalLink, Check,
  XCircle, AlertCircle, Info, HelpCircle, Lightbulb, Zap,
  Gift, Award, Send, Share2, Bookmark, Tag, Users, User,
  Bell, Sun, Moon, Cloud, CloudRain, Snowflake, Wind,
  Wifi, Battery, Volume2, VolumeX, Printer, TrendingUp,
  Eye, EyeOff, Lock, Unlock
} from 'lucide-vue-next'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'

const fileInputRef = ref(null)
const canvasRef = ref(null)
const bgImageInputRef = ref(null)

const platformFonts = {
  windows: [
    { name: 'Microsoft YaHei', labelKey: 'font.microsoftYaHei' },
    { name: 'SimHei', labelKey: 'font.simHei' },
    { name: 'SimSun', labelKey: 'font.simSun' },
    { name: 'KaiTi', labelKey: 'font.kaiTi' },
    { name: 'FangSong', labelKey: 'font.fangSong' },
    { name: 'YouYuan', labelKey: 'font.youYuan' },
    { name: 'SimKai', labelKey: 'font.simKai' },
    { name: 'STSong', labelKey: 'font.stSong' },
    { name: 'STXingkai', labelKey: 'font.stXingkai' },
    { name: 'STXinwei', labelKey: 'font.stXinwei' },
    { name: 'STLiti', labelKey: 'font.stLiti' }
  ],
  mac: [
    { name: 'PingFang SC', labelKey: 'font.pingFang' },
    { name: 'Hiragino Sans GB', labelKey: 'font.hiragino' },
    { name: 'STHeiti', labelKey: 'font.simHei' },
    { name: 'STSong', labelKey: 'font.stSong' },
    { name: 'STKaiti', labelKey: 'font.stKaiti' },
    { name: 'STXingkai', labelKey: 'font.stXingkai' },
    { name: 'STXinwei', labelKey: 'font.stXinwei' },
    { name: 'STLiti', labelKey: 'font.stLiti' },
    { name: 'KaiTi', labelKey: 'font.kaiTi' },
    { name: 'SimSun', labelKey: 'font.simSun' }
  ],
  linux: [
    { name: 'Noto Sans CJK SC', labelKey: 'font.notoSans' },
    { name: 'Noto Serif CJK SC', labelKey: 'font.notoSerif' },
    { name: 'WenQuanYi Micro Hei', labelKey: 'font.wenQuanYiMicro' },
    { name: 'WenQuanYi Zen Hei', labelKey: 'font.wenQuanYiZen' },
    { name: 'STSong', labelKey: 'font.stSong' },
    { name: 'SimSun', labelKey: 'font.simSun' }
  ],
  common: [
    { name: 'Arial', label: 'Arial' },
    { name: 'Times New Roman', label: 'Times New Roman' },
    { name: 'Verdana', label: 'Verdana' },
    { name: 'Tahoma', label: 'Tahoma' },
    { name: 'Georgia', label: 'Georgia' },
    { name: 'Courier New', label: 'Courier New' },
    { name: 'Comic Sans MS', label: 'Comic Sans MS' },
    { name: 'Impact', label: 'Impact' },
    { name: 'Palatino Linotype', label: 'Palatino Linotype' },
    { name: 'Garamond', label: 'Garamond' },
    { name: 'Book Antiqua', label: 'Book Antiqua' },
    { name: 'Trebuchet MS', label: 'Trebuchet MS' },
    { name: 'Century Gothic', label: 'Century Gothic' }
  ]
}

const detectPlatform = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Mac')) return 'mac'
  if (userAgent.includes('Windows')) return 'windows'
  return 'linux'
}

const detectFont = (fontName) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const testFonts = ['monospace', 'sans-serif', 'serif']
  
  for (const testFont of testFonts) {
    ctx.font = `72px ${testFont}`
    const baselineSize = ctx.measureText('ABCDEFGHIJKLMNOPQRSTUVWXYZ').width
    
    ctx.font = `72px "${fontName}", ${testFont}`
    const targetSize = ctx.measureText('ABCDEFGHIJKLMNOPQRSTUVWXYZ').width
    
    if (Math.abs(baselineSize - targetSize) > 1) {
      return true
    }
  }
  return false
}

const availableFonts = ref({
  chinese: [],
  english: []
})

const loadAvailableFonts = () => {
  const platform = detectPlatform()
  const platformSpecificFonts = platformFonts[platform]
  
  const chineseFonts = []
  for (const font of platformSpecificFonts) {
    if (detectFont(font.name)) {
      chineseFonts.push(font)
    }
  }
  
  const englishFonts = []
  for (const font of platformFonts.common) {
    if (detectFont(font.name)) {
      englishFonts.push(font)
    }
  }
  
  const finalChineseFonts = chineseFonts.length > 0 ? chineseFonts : platformSpecificFonts
  const finalEnglishFonts = englishFonts.length > 0 ? englishFonts : platformFonts.common
  
  availableFonts.value = {
    chinese: finalChineseFonts,
    english: finalEnglishFonts
  }
  
  const defaultFont = finalChineseFonts[0]?.name || 'Microsoft YaHei'
  textEditorData.value.fontFamily = defaultFont
  borderEditorData.value.fontFamily = defaultFont
  tableEditorData.value.fontFamily = defaultFont
}
const { t, locale } = useI18n()

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
const showOtherMenu = ref(false)

const showBuildTime = ref(false)
const buildTime = ref(__BUILD_TIME__)

const toggleMenu = (menuName) => {
  showShapeMenu.value = menuName === 'shape' ? !showShapeMenu.value : false
  showIconMenu.value = menuName === 'icon' ? !showIconMenu.value : false
  showStickerMenu.value = menuName === 'sticker' ? !showStickerMenu.value : false
  showOtherMenu.value = menuName === 'other' ? !showOtherMenu.value : false
}

const shapeEditorData = ref({
  color: '#3b82f6',
  opacity: 100,
  blur: 0
})

const iconEditorData = ref({
  color: '#333333'
})

const defaultSettings = ref({
  imageBorderRadius: 0,
  textFontSize: 24,
  textColor: '#333333'
})

const iconList = [
  { name: 'star', label: 'icon.star', component: Star },
  { name: 'heart', label: 'icon.heart', component: Heart },
  { name: 'circle', label: 'icon.circle', component: Circle },
  { name: 'triangle', label: 'icon.triangle', component: Triangle },
  { name: 'square', label: 'icon.square', component: Square },
  { name: 'hexagon', label: 'icon.hexagon', component: Hexagon },
  { name: 'arrow', label: 'icon.arrow', component: ArrowRight },
  { name: 'check', label: 'icon.check', component: Check },
  { name: 'x', label: 'icon.x', component: XCircle },
  { name: 'download', label: 'icon.download', component: Download },
  { name: 'upload', label: 'icon.upload', component: Upload },
  { name: 'edit', label: 'icon.edit', component: Edit3 },
  { name: 'copy', label: 'icon.copy', component: Copy },
  { name: 'file', label: 'icon.file', component: FileText },
  { name: 'folder', label: 'icon.folder', component: Folder },
  { name: 'settings', label: 'icon.settings', component: Settings },
  { name: 'printer', label: 'icon.printer', component: Printer },
  { name: 'home', label: 'icon.home', component: Home },
  { name: 'mail', label: 'icon.mail', component: Mail },
  { name: 'phone', label: 'icon.phone', component: Phone },
  { name: 'map', label: 'icon.map', component: MapPin },
  { name: 'send', label: 'icon.send', component: Send },
  { name: 'share', label: 'icon.share', component: Share2 },
  { name: 'link', label: 'icon.link', component: Link },
  { name: 'external', label: 'icon.external', component: ExternalLink },
  { name: 'clock', label: 'icon.clock', component: Clock },
  { name: 'calendar', label: 'icon.calendar', component: Calendar },
  { name: 'camera', label: 'icon.camera', component: Camera },
  { name: 'music', label: 'icon.music', component: Music },
  { name: 'video', label: 'icon.video', component: Video },
  { name: 'book', label: 'icon.book', component: Book },
  { name: 'alert', label: 'icon.alert', component: AlertCircle },
  { name: 'info', label: 'icon.info', component: Info },
  { name: 'help', label: 'icon.help', component: HelpCircle },
  { name: 'bell', label: 'icon.bell', component: Bell },
  { name: 'lightbulb', label: 'icon.lightbulb', component: Lightbulb },
  { name: 'zap', label: 'icon.zap', component: Zap },
  { name: 'gift', label: 'icon.gift', component: Gift },
  { name: 'award', label: 'icon.award', component: Award },
  { name: 'users', label: 'icon.users', component: Users },
  { name: 'user', label: 'icon.user', component: User },
  { name: 'bookmark', label: 'icon.bookmark', component: Bookmark },
  { name: 'tag', label: 'icon.tag', component: Tag },
  { name: 'sun', label: 'icon.sun', component: Sun },
  { name: 'moon', label: 'icon.moon', component: Moon },
  { name: 'cloud', label: 'icon.cloud', component: Cloud },
  { name: 'rain', label: 'icon.rain', component: CloudRain },
  { name: 'snow', label: 'icon.snow', component: Snowflake },
  { name: 'wind', label: 'icon.wind', component: Wind },
  { name: 'wifi', label: 'icon.wifi', component: Wifi },
  { name: 'battery', label: 'icon.battery', component: Battery },
  { name: 'volume', label: 'icon.volume', component: Volume2 },
  { name: 'mute', label: 'icon.mute', component: VolumeX },
  { name: 'trending', label: 'icon.trending', component: TrendingUp },
  { name: 'layout', label: 'icon.layout', component: LayoutGrid },
  { name: 'image', label: 'icon.image', component: ImagePlus },
  { name: 'text', label: 'icon.text', component: Type },
  { name: 'layer', label: 'icon.layer', component: Layers },
  { name: 'up', label: 'icon.up', component: ChevronUp },
  { name: 'down', label: 'icon.down', component: ChevronDown }
]

const stickerList = [
  { name: 'happy', label: 'sticker.happy', emoji: '😊' },
  { name: 'smile', label: 'sticker.smile', emoji: '🙂' },
  { name: 'grin', label: 'sticker.grin', emoji: '😀' },
  { name: 'laugh', label: 'sticker.laugh', emoji: '😂' },
  { name: 'joy', label: 'sticker.joy', emoji: '😂' },
  { name: 'cool', label: 'sticker.cool', emoji: '😎' },
  { name: 'sunglasses', label: 'sticker.sunglasses', emoji: '😎' },
  { name: 'heart_eyes', label: 'sticker.heart_eyes', emoji: '😍' },
  { name: 'blush', label: 'sticker.blush', emoji: '😳' },
  { name: 'kiss', label: 'sticker.kiss', emoji: '😘' },
  { name: 'wink', label: 'sticker.wink', emoji: '😉' },
  { name: 'sad', label: 'sticker.sad', emoji: '😢' },
  { name: 'cry', label: 'sticker.cry', emoji: '😭' },
  { name: 'tired', label: 'sticker.tired', emoji: '😫' },
  { name: 'sleepy', label: 'sticker.sleepy', emoji: '😴' },
  { name: 'angry', label: 'sticker.angry', emoji: '😠' },
  { name: 'surprised', label: 'sticker.surprised', emoji: '😮' },
  { name: 'thinking', label: 'sticker.thinking', emoji: '🤔' },
  { name: 'love', label: 'sticker.love', emoji: '❤️' },
  { name: 'heart', label: 'sticker.heart', emoji: '💖' },
  { name: 'sparkling_heart', label: 'sticker.sparkling_heart', emoji: '💖' },
  { name: 'cupid', label: 'sticker.cupid', emoji: '💘' },
  { name: 'two_hearts', label: 'sticker.two_hearts', emoji: '💕' },
  { name: 'heart_hands', label: 'sticker.heart_hands', emoji: '🤍' },
  { name: 'broken_heart', label: 'sticker.broken_heart', emoji: '💔' },
  { name: 'thumbsup', label: 'sticker.thumbsup', emoji: '👍' },
  { name: 'thumbsdown', label: 'sticker.thumbsdown', emoji: '👎' },
  { name: 'clap', label: 'sticker.clap', emoji: '👏' },
  { name: 'wave', label: 'sticker.wave', emoji: '👋' },
  { name: 'ok', label: 'sticker.ok', emoji: '👌' },
  { name: 'fist', label: 'sticker.fist', emoji: '✊' },
  { name: 'star', label: 'sticker.star', emoji: '⭐' },
  { name: 'fire', label: 'sticker.fire', emoji: '🔥' },
  { name: 'sparkle', label: 'sticker.sparkle', emoji: '✨' },
  { name: 'sun', label: 'sticker.sun', emoji: '☀️' },
  { name: 'cloud', label: 'sticker.cloud', emoji: '☁️' },
  { name: 'rainbow', label: 'sticker.rainbow', emoji: '🌈' },
  { name: 'umbrella', label: 'sticker.umbrella', emoji: '☔' },
  { name: 'snowflake', label: 'sticker.snowflake', emoji: '❄️' },
  { name: 'zap', label: 'sticker.zap', emoji: '⚡' },
  { name: 'celebrate', label: 'sticker.celebrate', emoji: '🎉' },
  { name: 'confetti', label: 'sticker.confetti', emoji: '🎊' },
  { name: 'party', label: 'sticker.party', emoji: '🥳' },
  { name: 'cake', label: 'sticker.cake', emoji: '🎂' },
  { name: 'gift', label: 'sticker.gift', emoji: '🎁' },
  { name: 'balloon', label: 'sticker.balloon', emoji: '🎈' },
  { name: 'flower', label: 'sticker.flower', emoji: '🌸' },
  { name: 'trophy', label: 'sticker.trophy', emoji: '🏆' },
  { name: 'medal', label: 'sticker.medal', emoji: '🥇' },
  { name: 'rocket', label: 'sticker.rocket', emoji: '🚀' }
]

const borderList = [
  { name: 'solid', style: 'solid', color: '#333333', radius: 0 },
  { name: 'dashed', style: 'dashed', color: '#333333', radius: 0 },
  { name: 'dotted', style: 'dotted', color: '#333333', radius: 0 },
  { name: 'double', style: 'double', color: '#333333', radius: 0 },
  { name: 'rounded', style: 'solid', color: '#333333', radius: 8 },
  { name: 'rounded-lg', style: 'solid', color: '#333333', radius: 16 },
  { name: 'red', style: 'solid', color: '#ef4444', radius: 0 },
  { name: 'blue', style: 'solid', color: '#3b82f6', radius: 0 }
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
  fontFamily: 'Microsoft YaHei',
  fontSize: 14,
  fontColor: '#333333',
  cells: []
})

const borderEditorData = ref({
  borderColor: '#333333',
  borderWidth: 2,
  borderRadius: 4,
  borderStyle: 'solid',
  text: '',
  fontFamily: 'Microsoft YaHei',
  fontSize: 14,
  fontColor: '#333333'
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
  if (historyIndex.value < 0) return
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
    return t('layer.image')
  } else if (element.type === 'text') {
    return t('layer.text')
  } else if (element.type === 'shape') {
    const shapeNames = {
      rectangle: t('shape.rectangle'),
      circle: t('shape.circle'),
      ellipse: t('shape.ellipse'),
      triangle: t('shape.triangle'),
      diamond: t('shape.diamond'),
      star: t('shape.star'),
      heart: t('shape.heart'),
      arrow: t('shape.arrow')
    }
    return shapeNames[element.shapeType] || t('layer.shape')
  } else if (element.type === 'icon') {
    const iconNames = {
      star: t('icon.star'),
      heart: t('icon.heart'),
      circle: t('icon.circle'),
      triangle: t('icon.triangle'),
      square: t('icon.square'),
      hexagon: t('icon.hexagon'),
      arrow: t('icon.arrow'),
      download: t('icon.download'),
      upload: t('icon.upload'),
      edit: t('icon.edit'),
      copy: t('icon.copy'),
      settings: t('icon.settings')
    }
    return iconNames[element.iconName] || t('layer.icon')
  } else if (element.type === 'sticker') {
    const stickerNames = {
      happy: t('sticker.happy'),
      love: t('sticker.love'),
      star: t('sticker.star'),
      fire: t('sticker.fire'),
      sparkle: t('sticker.sparkle'),
      thumbsup: t('sticker.thumbsup'),
      heart_eyes: t('sticker.heart_eyes'),
      laugh: t('sticker.laugh'),
      cool: t('sticker.cool'),
      sad: t('sticker.sad'),
      angry: t('sticker.angry'),
      surprised: t('sticker.surprised'),
      celebrate: t('sticker.celebrate'),
      confetti: t('sticker.confetti'),
      cake: t('sticker.cake'),
      party: t('sticker.party')
    }
    return stickerNames[element.stickerName] || t('layer.sticker')
  } else if (element.type === 'border') {
    const borderNames = {
      solid: t('border.solid'),
      dashed: t('border.dashed'),
      dotted: t('border.dotted'),
      double: t('border.double'),
      rounded: t('border.rounded'),
      'rounded-lg': t('border.rounded-lg'),
      red: t('border.red'),
      blue: t('border.blue')
    }
    return borderNames[element.borderName] || t('layer.border')
  } else if (element.type === 'table') {
    return t('layer.table')
  } else if (element.type === 'qrcode') {
    return t('layer.qrcode')
  }
  return 'Element'
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

const availableLanguages = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en', label: 'English' }
]

const changeLanguage = (lang) => {
  locale.value = lang
  document.getElementById('page-title').textContent = t('app.title')
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

const switchToImageBackground = () => {
  canvasBgType.value = 'image'
  if (canvasBgImage.value) {
    const img = new Image()
    img.onload = () => {
      if (canvasBgFillMode.value === 'resize') {
        canvasWidth.value = img.width
        canvasHeight.value = img.height
      } else if (canvasBgFillMode.value === 'cover') {
        const scale = Math.max(canvasWidth.value / img.width, canvasHeight.value / img.height)
        canvasWidth.value = Math.round(img.width * scale)
        canvasHeight.value = Math.round(img.height * scale)
      } else if (canvasBgFillMode.value === 'stretch') {
        canvasWidth.value = img.width
        canvasHeight.value = img.height
      }
    }
    img.src = canvasBgImage.value
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
  const target = event.target
  const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
  
  if (!selectedElement.value) return
  
  if (isInput) return

  const step = 1
  let updated = false

  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      event.preventDefault()
      saveHistory(selectedElement.value)
      if (event.key === 'ArrowUp') selectedElement.value.y -= step
      if (event.key === 'ArrowDown') selectedElement.value.y += step
      if (event.key === 'ArrowLeft') selectedElement.value.x -= step
      if (event.key === 'ArrowRight') selectedElement.value.x += step
      updated = true
      break
    case 'Delete':
    case 'Backspace':
      event.preventDefault()
      deleteElement(selectedElement.value)
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
  loadAvailableFonts()
  
  window.handleCtrlD = function() {
    if (selectedElement.value) {
      const target = document.activeElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (!isInput) {
        duplicateElement(selectedElement.value)
      }
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('resize', updateCanvasScale)
  window.handleCtrlD = null
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
    opacity: shapeEditorData.value.opacity,
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
      { text: `${t('table.cell')}1` }, { text: `${t('table.cell')}2` }, { text: `${t('table.cell')}3` },
      { text: `${t('table.cell')}4` }, { text: `${t('table.cell')}5` }, { text: `${t('table.cell')}6` },
      { text: `${t('table.cell')}7` }, { text: `${t('table.cell')}8` }, { text: `${t('table.cell')}9` }
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

const qrCodeEditorData = ref({
  content: 'https://example.com',
  size: 150,
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
  borderStyle: 'none',
  borderColor: '#333333',
  borderWidth: 0
})

const addQRCode = () => {
  const size = qrCodeEditorData.value.size
  
  const newElement = {
    id: ++idCounter,
    type: 'qrcode',
    x: (canvasWidth.value - size) / 2,
    y: (canvasHeight.value - size) / 2,
    width: size,
    height: size,
    scale: 100,
    content: qrCodeEditorData.value.content,
    foregroundColor: qrCodeEditorData.value.foregroundColor,
    backgroundColor: qrCodeEditorData.value.backgroundColor,
    borderStyle: qrCodeEditorData.value.borderStyle,
    borderColor: qrCodeEditorData.value.borderColor,
    borderWidth: qrCodeEditorData.value.borderWidth,
    qrDataUrl: generateQRCodeDataUrl(
      qrCodeEditorData.value.content, 
      size, 
      qrCodeEditorData.value.foregroundColor,
      qrCodeEditorData.value.backgroundColor,
      qrCodeEditorData.value.borderStyle, 
      qrCodeEditorData.value.borderColor, 
      qrCodeEditorData.value.borderWidth
    ),
    zIndex: elements.value.length + 1
  }
  
  elements.value.push(newElement)
  selectElement(newElement)
}

const updateQRCodeElement = () => {
  if (selectedElement.value && selectedElement.value.type === 'qrcode') {
    saveHistory(selectedElement.value)
    selectedElement.value.content = qrCodeEditorData.value.content
    selectedElement.value.width = qrCodeEditorData.value.size
    selectedElement.value.height = qrCodeEditorData.value.size
    selectedElement.value.foregroundColor = qrCodeEditorData.value.foregroundColor
    selectedElement.value.backgroundColor = qrCodeEditorData.value.backgroundColor
    selectedElement.value.borderStyle = qrCodeEditorData.value.borderStyle
    selectedElement.value.borderColor = qrCodeEditorData.value.borderColor
    selectedElement.value.borderWidth = qrCodeEditorData.value.borderWidth
    selectedElement.value.qrDataUrl = generateQRCodeDataUrl(
      selectedElement.value.content, 
      selectedElement.value.width,
      selectedElement.value.foregroundColor,
      selectedElement.value.backgroundColor,
      selectedElement.value.borderStyle,
      selectedElement.value.borderColor,
      selectedElement.value.borderWidth
    )
    selectedElement.value.qrKey = Date.now()
  }
}

const generateQRCode = () => {
  updateQRCodeElement()
}

const generateQRCodeDataUrl = (content, size, foregroundColor = '#000000', backgroundColor = '#ffffff', borderStyle = 'none', borderColor = '#333333', borderWidth = 0) => {
  if (!content || !size) {
    return generatePlaceholderQRCode(size, foregroundColor, backgroundColor, borderStyle, borderColor, borderWidth)
  }
  
  const borderOffset = borderWidth > 0 ? borderWidth : 0
  const qrSize = size
  const canvas = document.createElement('canvas')
  canvas.width = qrSize + borderOffset * 2
  canvas.height = qrSize + borderOffset * 2
  
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  try {
    const qrCanvas = document.createElement('canvas')
    QRCode.toCanvas(qrCanvas, content, {
      width: qrSize,
      color: {
        dark: foregroundColor,
        light: backgroundColor
      },
      margin: 1
    })
    
    ctx.drawImage(qrCanvas, borderOffset, borderOffset, qrSize, qrSize)
    
    if (borderStyle !== 'none' && borderWidth > 0) {
      ctx.strokeStyle = borderColor
      ctx.lineWidth = borderWidth
      ctx.setLineDash(borderStyle === 'dashed' ? [4, 4] : borderStyle === 'dotted' ? [2, 2] : [])
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, canvas.width - borderWidth, canvas.height - borderWidth)
      ctx.setLineDash([])
    }
    
    return canvas.toDataURL('image/png')
  } catch (error) {
    console.error('QRCode generation error:', error)
    return generatePlaceholderQRCode(size, foregroundColor, backgroundColor, borderStyle, borderColor, borderWidth)
  }
}

const generatePlaceholderQRCode = (size, foregroundColor = '#000000', backgroundColor = '#ffffff', borderStyle = 'none', borderColor = '#333333', borderWidth = 0) => {
  const canvas = document.createElement('canvas')
  const borderOffset = borderWidth > 0 ? borderWidth : 0
  canvas.width = size + borderOffset * 2
  canvas.height = size + borderOffset * 2
  const ctx = canvas.getContext('2d')
  
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  const blockSize = Math.max(4, Math.floor(size / 20))
  const padding = blockSize
  
  ctx.fillStyle = foregroundColor
  
  const drawCorner = (x, y) => {
    ctx.fillRect(x + borderOffset, y + borderOffset, blockSize * 3, blockSize * 3)
    ctx.fillStyle = backgroundColor
    ctx.fillRect(x + borderOffset + blockSize, y + borderOffset + blockSize, blockSize, blockSize)
    ctx.fillStyle = foregroundColor
  }
  
  drawCorner(padding, padding)
  drawCorner(size - padding - blockSize * 3, padding)
  drawCorner(padding, size - padding - blockSize * 3)
  
  ctx.fillStyle = foregroundColor
  ctx.globalAlpha = 0.5
  const patternSize = blockSize
  for (let i = 0; i < Math.floor((size - padding * 4) / patternSize); i++) {
    for (let j = 0; j < Math.floor((size - padding * 4) / patternSize); j++) {
      const x = padding * 2 + j * patternSize + borderOffset
      const y = padding * 2 + i * patternSize + borderOffset
      if (Math.random() > 0.5) {
        ctx.fillRect(x, y, patternSize - 1, patternSize - 1)
      }
    }
  }
  ctx.globalAlpha = 1.0
  
  if (borderStyle !== 'none' && borderWidth > 0) {
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth
    ctx.setLineDash(borderStyle === 'dashed' ? [4, 4] : borderStyle === 'dotted' ? [2, 2] : [])
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, canvas.width - borderWidth, canvas.height - borderWidth)
    ctx.setLineDash([])
  }
  
  return canvas.toDataURL('image/png')
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
  const opacity = (element.opacity || 100) / 100
  
  const style = {
    backgroundColor: element.color,
    opacity: opacity,
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
  const opacity = (element.opacity || 100) / 100
  style.opacity = opacity
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
  const opacity = (element.opacity || 100) / 100
  const style = {
    backgroundColor: element.color,
    opacity: opacity,
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
    selectedElement.value.opacity = shapeEditorData.value.opacity
    selectedElement.value.blur = shapeEditorData.value.blur
  }
}

const updateIconElement = () => {
  if (selectedElement.value && selectedElement.value.type === 'icon') {
    saveHistory(selectedElement.value)
    selectedElement.value.color = iconEditorData.value.color
  }
}

const updateBorderElement = () => {
  if (selectedElement.value && selectedElement.value.type === 'border') {
    saveHistory(selectedElement.value)
    selectedElement.value.borderColor = borderEditorData.value.borderColor
    selectedElement.value.borderWidth = borderEditorData.value.borderWidth
    selectedElement.value.borderRadius = borderEditorData.value.borderRadius
    selectedElement.value.borderStyle = borderEditorData.value.borderStyle
    selectedElement.value.text = borderEditorData.value.text
    selectedElement.value.fontFamily = borderEditorData.value.fontFamily
    selectedElement.value.fontSize = borderEditorData.value.fontSize
    selectedElement.value.fontColor = borderEditorData.value.fontColor
  }
}

const updateTableElement = () => {
  if (selectedElement.value && selectedElement.value.type === 'table') {
    saveHistory(selectedElement.value)
    selectedElement.value.borderColor = tableEditorData.value.borderColor
    selectedElement.value.borderWidth = tableEditorData.value.borderWidth
    selectedElement.value.fontFamily = tableEditorData.value.fontFamily
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
  const defaultFontFamily = availableFonts.value.chinese[0]?.name || 'Microsoft YaHei'
  const newElement = {
    id: ++idCounter,
    type: 'text',
    text: t('common.doubleClickEdit'),
    x: canvasWidth.value / 2 - 100,
    y: canvasHeight.value / 2 - fontSize / 2,
    width: 200,
    height: fontSize + 16,
    scale: 100,
    fontFamily: defaultFontFamily,
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
  if (element.locked) return
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
      opacity: element.opacity || 100,
      blur: element.blur || 0
    }
  } else if (element.type === 'border') {
    borderEditorData.value = {
      borderColor: element.borderColor,
      borderWidth: element.borderWidth || 2,
      borderRadius: element.borderRadius || 4,
      borderStyle: element.borderStyle || 'solid',
      text: element.text || '',
      fontFamily: element.fontFamily || 'Microsoft YaHei',
      fontSize: element.fontSize || 14,
      fontColor: element.fontColor || '#333333'
    }
  } else if (element.type === 'table') {
    tableEditorData.value = {
      rows: element.rows,
      cols: element.cols,
      borderColor: element.borderColor,
      borderWidth: element.borderWidth,
      fontFamily: element.fontFamily || 'Microsoft YaHei',
      fontSize: element.fontSize || 14,
      fontColor: element.fontColor || '#333333',
      cells: element.cells
    }
  } else if (element.type === 'qrcode') {
    qrCodeEditorData.value = {
      content: element.content || '',
      size: Math.min(element.width, element.height),
      foregroundColor: element.foregroundColor || '#000000',
      backgroundColor: element.backgroundColor || '#ffffff',
      borderStyle: element.borderStyle || 'none',
      borderColor: element.borderColor || '#333333',
      borderWidth: element.borderWidth || 0
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
  if (element.locked) return
  event.preventDefault()

  saveHistory(element)

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

const toggleVisibility = (element) => {
  element.visible = element.visible === false
}

const toggleLock = (element) => {
  element.locked = element.locked !== true
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
    
    if (canvasBgType.value === 'color') {
      ctx.fillStyle = canvasBgColor.value
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else if (canvasBgType.value === 'image' && canvasBgImage.value) {
      const bgImg = new Image()
      bgImg.crossOrigin = 'anonymous'
      await new Promise((resolve, reject) => {
        bgImg.onload = resolve
        bgImg.onerror = reject
        bgImg.src = canvasBgImage.value
      })
      
      if (canvasBgFillMode.value === 'cover') {
        const bgScale = Math.max(canvas.width / bgImg.width, canvas.height / bgImg.height)
        const x = (canvas.width - bgImg.width * bgScale) / 2
        const y = (canvas.height - bgImg.height * bgScale) / 2
        ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, x, y, bgImg.width * bgScale, bgImg.height * bgScale)
      } else if (canvasBgFillMode.value === 'stretch') {
        ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, canvas.width, canvas.height)
      } else {
        const x = (canvas.width - bgImg.width * scale) / 2
        const y = (canvas.height - bgImg.height * scale) / 2
        ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, x, y, bgImg.width * scale, bgImg.height * scale)
      }
    } else {
      ctx.fillStyle = canvasBgColor.value
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    
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
        const fontStyle = []
        if (element.bold) fontStyle.push('bold')
        if (element.italic) fontStyle.push('italic')
        ctx.font = `${fontStyle.join(' ')} ${element.fontSize * scale}px "${element.fontFamily || 'Microsoft YaHei'}", 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'STHeiti', 'SimHei', 'STSong', 'SimSun', 'KaiTi', 'STKaiti', sans-serif`.trim()
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
        const opacity = (element.opacity || 100) / 100
        ctx.globalAlpha = opacity
        
        const blur = (element.blur || 0) * scale
        if (blur > 0) {
          ctx.filter = `blur(${blur}px)`
          // 下面两行去掉好像也没问题
          ctx.shadowColor = element.color
          ctx.shadowBlur = blur * 2
        }
        
        const shapeCanvas = await exportShapeToCanvas(element, scale)
        if (shapeCanvas) {
          ctx.drawImage(shapeCanvas, element.x * scale, element.y * scale, displayWidth, displayHeight)
        } else {
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
          }
        }
        
        ctx.restore()
      } else if (element.type === 'icon') {
        const iconCanvas = await exportIconToCanvas(element, scale)
        if (iconCanvas) {
          const displayWidth = element.width * (element.scale / 100) * scale
          const displayHeight = element.height * (element.scale / 100) * scale
          ctx.drawImage(iconCanvas, element.x * scale, element.y * scale, displayWidth, displayHeight)
        }
      } else if (element.type === 'qrcode') {
        const qrCanvas = exportQRCodeToCanvas(element, scale)
        if (qrCanvas) {
          const displayWidth = element.width * (element.scale / 100) * scale
          const displayHeight = element.height * (element.scale / 100) * scale
          ctx.drawImage(qrCanvas, element.x * scale, element.y * scale, displayWidth, displayHeight)
        }
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
        
        if (element.text) {
          const fontSize = (element.fontSize || 14) * scale
          const lineHeight = fontSize * 1.2
          ctx.font = `${fontSize}px ${element.fontFamily || 'Microsoft YaHei'}`
          ctx.fillStyle = element.fontColor || '#333333'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          
          const lines = element.text.split('\n')
          const maxLines = Math.floor(displayHeight / lineHeight)
          const visibleLines = lines.slice(0, maxLines)
          const totalHeight = visibleLines.length * lineHeight
          const startY = element.y * scale + displayHeight / 2 - totalHeight / 2 + lineHeight / 2
          
          for (let i = 0; i < visibleLines.length; i++) {
            ctx.fillText(visibleLines[i], element.x * scale + displayWidth / 2, startY + i * lineHeight)
          }
        }
        
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
        
        ctx.font = `${fontSize}px ${element.fontFamily || 'Microsoft YaHei'}`
        
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
    link.download = `${t('common.poster')}_${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()

    wrapper.style.transform = originalTransform
    canvasRef.value.style.width = originalWidth
    canvasRef.value.style.height = originalHeight
  } catch (error) {
    console.error(t('common.exportFailed'), error)
    alert(t('common.exportFailed'))
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

const exportIconToCanvas = async (element, scale) => {
  const iconComponent = iconList.find(i => i.name === element.iconName)?.component
  if (!iconComponent) return null
  
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.top = '-10000px'
  tempDiv.style.width = `${element.width}px`
  tempDiv.style.height = `${element.height}px`
  tempDiv.style.display = 'flex'
  tempDiv.style.alignItems = 'center'
  tempDiv.style.justifyContent = 'center'
  document.body.appendChild(tempDiv)
  
  const vueIcon = createVNode(iconComponent, {
    class: 'w-full h-full',
    style: { color: element.color }
  })
  render(vueIcon, tempDiv)
  
  const iconCanvas = await html2canvas(tempDiv, {
    backgroundColor: null,
    scale: scale
  })
  
  document.body.removeChild(tempDiv)
  render(null, tempDiv)
  
  return iconCanvas
}

const exportQRCodeToCanvas = (element, scale) => {
  const qrSize = Math.min(element.width, element.height) * (element.scale / 100) * scale
  const borderWidth = (element.borderWidth || 0) * scale
  
  const canvas = document.createElement('canvas')
  const totalSize = qrSize + borderWidth * 2
  canvas.width = totalSize
  canvas.height = totalSize
  
  const foregroundColor = element.foregroundColor || '#000000'
  const backgroundColor = element.backgroundColor || '#ffffff'
  const borderStyle = element.borderStyle || 'none'
  const borderColor = element.borderColor || '#333333'
  
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, totalSize, totalSize)
  
  if (!element.content) {
    return canvas
  }
  
  try {
    const qrCanvas = document.createElement('canvas')
    QRCode.toCanvas(qrCanvas, element.content, {
      width: qrSize,
      color: {
        dark: foregroundColor,
        light: backgroundColor
      },
      margin: 1
    })
    
    ctx.drawImage(qrCanvas, borderWidth, borderWidth, qrSize, qrSize)
    
    if (borderStyle !== 'none' && borderWidth > 0) {
      ctx.strokeStyle = borderColor
      ctx.lineWidth = borderWidth
      ctx.setLineDash(borderStyle === 'dashed' ? [4 * scale, 4 * scale] : borderStyle === 'dotted' ? [2 * scale, 2 * scale] : [])
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, totalSize - borderWidth, totalSize - borderWidth)
      ctx.setLineDash([])
    }
  } catch (error) {
    console.error('Export QRCode error:', error)
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, totalSize, totalSize)
  }
  
  return canvas
}

const exportShapeToCanvas = async (element, scale) => {
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.top = '-10000px'
  tempDiv.style.width = `${element.width}px`
  tempDiv.style.height = `${element.height}px`
  tempDiv.style.display = 'flex'
  tempDiv.style.alignItems = 'center'
  tempDiv.style.justifyContent = 'center'
  document.body.appendChild(tempDiv)
  
  let svgContent = ''
  const borderRadius = element.borderRadius || 0
  const w = element.width
  const h = element.height
  
  if (element.shapeType === 'rectangle') {
    const rx = borderRadius * w / 100
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${rx}" fill="${element.color}"/></svg>`
  } else if (element.shapeType === 'circle') {
    const radius = Math.min(w, h) / 2
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><circle cx="${w/2}" cy="${h/2}" r="${radius}" fill="${element.color}"/></svg>`
  } else if (element.shapeType === 'ellipse') {
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" fill="${element.color}"/></svg>`
  } else if (element.shapeType === 'heart') {
    const scaleX = w / 24
    const scaleY = h / 24
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${element.color}"/></svg>`
  } else if (element.shapeType === 'star') {
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><polygon points="12,2 15,9 22,9 16,14 18,22 12,18 6,22 8,14 2,9 9,9" fill="${element.color}"/></svg>`
  } else if (element.shapeType === 'arrow') {
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><rect x="3" y="8" width="14" height="8" rx="1" fill="${element.color}"/><polygon points="17,4 24,12 17,20" fill="${element.color}"/></svg>`
  } else if (element.shapeType === 'triangle') {
    const cx = w / 2
    const cy = h
    const base = w * 0.9
    const pointY = h * 0.1
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points="${cx},${pointY} ${w - w*0.05},${cy - h*0.05} ${w*0.05},${cy - h*0.05}" fill="${element.color}"/></svg>`
  } else if (element.shapeType === 'hexagon') {
    const cx = w / 2
    const cy = h / 2
    const rx = w * 0.45
    const ry = h * 0.45
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      points.push(`${cx + Math.cos(angle) * rx},${cy + Math.sin(angle) * ry}`)
    }
    svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points="${points.join(' ')}" fill="${element.color}"/></svg>`
  } else {
    return null
  }
  
  tempDiv.innerHTML = svgContent
  
  const shapeCanvas = await html2canvas(tempDiv, {
    backgroundColor: null,
    scale: scale
  })
  
  document.body.removeChild(tempDiv)
  
  return shapeCanvas
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
