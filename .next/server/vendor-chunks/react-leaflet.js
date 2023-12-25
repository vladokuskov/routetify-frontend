"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-leaflet";
exports.ids = ["vendor-chunks/react-leaflet"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-leaflet/lib/MapContainer.js":
/*!********************************************************!*\
  !*** ./node_modules/react-leaflet/lib/MapContainer.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MapContainer: () => (/* binding */ MapContainer)\n/* harmony export */ });\n/* harmony import */ var _react_leaflet_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-leaflet/core */ \"(ssr)/./node_modules/@react-leaflet/core/lib/context.js\");\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ \"(ssr)/./node_modules/leaflet/dist/leaflet-src.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\nfunction _extends() {\n    _extends = Object.assign || function(target) {\n        for(var i = 1; i < arguments.length; i++){\n            var source = arguments[i];\n            for(var key in source){\n                if (Object.prototype.hasOwnProperty.call(source, key)) {\n                    target[key] = source[key];\n                }\n            }\n        }\n        return target;\n    };\n    return _extends.apply(this, arguments);\n}\n\n\n\nfunction MapContainerComponent({ bounds , boundsOptions , center , children , className , id , placeholder , style , whenReady , zoom , ...options }, forwardedRef) {\n    const [props] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        className,\n        id,\n        style\n    });\n    const [context, setContext] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(forwardedRef, ()=>context?.map ?? null, [\n        context\n    ]);\n    const mapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((node)=>{\n        if (node !== null && context === null) {\n            const map = new leaflet__WEBPACK_IMPORTED_MODULE_0__.Map(node, options);\n            if (center != null && zoom != null) {\n                map.setView(center, zoom);\n            } else if (bounds != null) {\n                map.fitBounds(bounds, boundsOptions);\n            }\n            if (whenReady != null) {\n                map.whenReady(whenReady);\n            }\n            setContext((0,_react_leaflet_core__WEBPACK_IMPORTED_MODULE_2__.createLeafletContext)(map));\n        }\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        return ()=>{\n            context?.map.remove();\n        };\n    }, [\n        context\n    ]);\n    const contents = context ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(_react_leaflet_core__WEBPACK_IMPORTED_MODULE_2__.LeafletProvider, {\n        value: context\n    }, children) : placeholder ?? null;\n    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(\"div\", _extends({}, props, {\n        ref: mapRef\n    }), contents);\n}\nconst MapContainer = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(MapContainerComponent);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtbGVhZmxldC9saWIvTWFwQ29udGFpbmVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzRFO0FBQ2hDO0FBQ3FEO0FBQ2pHLGlDQUFpQyxtSEFBbUg7QUFDcEosb0JBQW9CLCtDQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQ0FBa0MsK0NBQVE7QUFDMUMsSUFBSSwwREFBbUI7QUFDdkI7QUFDQTtBQUNBLG1CQUFtQixrREFBVztBQUM5QjtBQUNBLDRCQUE0Qix3Q0FBVTtBQUN0QztBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIseUVBQW9CO0FBQzNDO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkNBQTZDLGdEQUFtQixDQUFDLGdFQUFlO0FBQ2hGO0FBQ0EsS0FBSztBQUNMLHlCQUF5QixnREFBbUIsbUJBQW1CO0FBQy9EO0FBQ0EsS0FBSztBQUNMO0FBQ08sbUNBQW1DLGlEQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3JlYWN0LWxlYWZsZXQvbGliL01hcENvbnRhaW5lci5qcz9lOWVlIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICAgIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gc291cmNlKXtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG4gICAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5pbXBvcnQgeyBMZWFmbGV0UHJvdmlkZXIsIGNyZWF0ZUxlYWZsZXRDb250ZXh0IH0gZnJvbSAnQHJlYWN0LWxlYWZsZXQvY29yZSc7XG5pbXBvcnQgeyBNYXAgYXMgTGVhZmxldE1hcCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUltcGVyYXRpdmVIYW5kbGUsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuZnVuY3Rpb24gTWFwQ29udGFpbmVyQ29tcG9uZW50KHsgYm91bmRzICwgYm91bmRzT3B0aW9ucyAsIGNlbnRlciAsIGNoaWxkcmVuICwgY2xhc3NOYW1lICwgaWQgLCBwbGFjZWhvbGRlciAsIHN0eWxlICwgd2hlblJlYWR5ICwgem9vbSAsIC4uLm9wdGlvbnMgfSwgZm9yd2FyZGVkUmVmKSB7XG4gICAgY29uc3QgW3Byb3BzXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICBpZCxcbiAgICAgICAgc3R5bGVcbiAgICB9KTtcbiAgICBjb25zdCBbY29udGV4dCwgc2V0Q29udGV4dF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VJbXBlcmF0aXZlSGFuZGxlKGZvcndhcmRlZFJlZiwgKCk9PmNvbnRleHQ/Lm1hcCA/PyBudWxsLCBbXG4gICAgICAgIGNvbnRleHRcbiAgICBdKTtcbiAgICBjb25zdCBtYXBSZWYgPSB1c2VDYWxsYmFjaygobm9kZSk9PntcbiAgICAgICAgaWYgKG5vZGUgIT09IG51bGwgJiYgY29udGV4dCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbWFwID0gbmV3IExlYWZsZXRNYXAobm9kZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoY2VudGVyICE9IG51bGwgJiYgem9vbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldFZpZXcoY2VudGVyLCB6b29tKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYm91bmRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcywgYm91bmRzT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2hlblJlYWR5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtYXAud2hlblJlYWR5KHdoZW5SZWFkeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRDb250ZXh0KGNyZWF0ZUxlYWZsZXRDb250ZXh0KG1hcCkpO1xuICAgICAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICAgIH0sIFtdKTtcbiAgICB1c2VFZmZlY3QoKCk9PntcbiAgICAgICAgcmV0dXJuICgpPT57XG4gICAgICAgICAgICBjb250ZXh0Py5tYXAucmVtb3ZlKCk7XG4gICAgICAgIH07XG4gICAgfSwgW1xuICAgICAgICBjb250ZXh0XG4gICAgXSk7XG4gICAgY29uc3QgY29udGVudHMgPSBjb250ZXh0ID8gLyojX19QVVJFX18qLyBSZWFjdC5jcmVhdGVFbGVtZW50KExlYWZsZXRQcm92aWRlciwge1xuICAgICAgICB2YWx1ZTogY29udGV4dFxuICAgIH0sIGNoaWxkcmVuKSA6IHBsYWNlaG9sZGVyID8/IG51bGw7XG4gICAgcmV0dXJuIC8qI19fUFVSRV9fKi8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICAgICAgcmVmOiBtYXBSZWZcbiAgICB9KSwgY29udGVudHMpO1xufVxuZXhwb3J0IGNvbnN0IE1hcENvbnRhaW5lciA9IC8qI19fUFVSRV9fKi8gZm9yd2FyZFJlZihNYXBDb250YWluZXJDb21wb25lbnQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-leaflet/lib/MapContainer.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/react-leaflet/lib/TileLayer.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-leaflet/lib/TileLayer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TileLayer: () => (/* binding */ TileLayer)\n/* harmony export */ });\n/* harmony import */ var _react_leaflet_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-leaflet/core */ \"(ssr)/./node_modules/@react-leaflet/core/lib/generic.js\");\n/* harmony import */ var _react_leaflet_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-leaflet/core */ \"(ssr)/./node_modules/@react-leaflet/core/lib/pane.js\");\n/* harmony import */ var _react_leaflet_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-leaflet/core */ \"(ssr)/./node_modules/@react-leaflet/core/lib/element.js\");\n/* harmony import */ var _react_leaflet_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-leaflet/core */ \"(ssr)/./node_modules/@react-leaflet/core/lib/grid-layer.js\");\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ \"(ssr)/./node_modules/leaflet/dist/leaflet-src.js\");\n\n\nconst TileLayer = (0,_react_leaflet_core__WEBPACK_IMPORTED_MODULE_1__.createTileLayerComponent)(function createTileLayer({ url , ...options }, context) {\n    const layer = new leaflet__WEBPACK_IMPORTED_MODULE_0__.TileLayer(url, (0,_react_leaflet_core__WEBPACK_IMPORTED_MODULE_2__.withPane)(options, context));\n    return (0,_react_leaflet_core__WEBPACK_IMPORTED_MODULE_3__.createElementObject)(layer, context);\n}, function updateTileLayer(layer, props, prevProps) {\n    (0,_react_leaflet_core__WEBPACK_IMPORTED_MODULE_4__.updateGridLayer)(layer, props, prevProps);\n    const { url  } = props;\n    if (url != null && url !== prevProps.url) {\n        layer.setUrl(url);\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtbGVhZmxldC9saWIvVGlsZUxheWVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUErRztBQUN2RDtBQUNqRCxrQkFBa0IsNkVBQXdCLDRCQUE0QixrQkFBa0I7QUFDL0Ysc0JBQXNCLDhDQUFnQixNQUFNLDZEQUFRO0FBQ3BELFdBQVcsd0VBQW1CO0FBQzlCLENBQUM7QUFDRCxJQUFJLG9FQUFlO0FBQ25CLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3JlYWN0LWxlYWZsZXQvbGliL1RpbGVMYXllci5qcz9lZTk3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnRPYmplY3QsIGNyZWF0ZVRpbGVMYXllckNvbXBvbmVudCwgdXBkYXRlR3JpZExheWVyLCB3aXRoUGFuZSB9IGZyb20gJ0ByZWFjdC1sZWFmbGV0L2NvcmUnO1xuaW1wb3J0IHsgVGlsZUxheWVyIGFzIExlYWZsZXRUaWxlTGF5ZXIgfSBmcm9tICdsZWFmbGV0JztcbmV4cG9ydCBjb25zdCBUaWxlTGF5ZXIgPSBjcmVhdGVUaWxlTGF5ZXJDb21wb25lbnQoZnVuY3Rpb24gY3JlYXRlVGlsZUxheWVyKHsgdXJsICwgLi4ub3B0aW9ucyB9LCBjb250ZXh0KSB7XG4gICAgY29uc3QgbGF5ZXIgPSBuZXcgTGVhZmxldFRpbGVMYXllcih1cmwsIHdpdGhQYW5lKG9wdGlvbnMsIGNvbnRleHQpKTtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudE9iamVjdChsYXllciwgY29udGV4dCk7XG59LCBmdW5jdGlvbiB1cGRhdGVUaWxlTGF5ZXIobGF5ZXIsIHByb3BzLCBwcmV2UHJvcHMpIHtcbiAgICB1cGRhdGVHcmlkTGF5ZXIobGF5ZXIsIHByb3BzLCBwcmV2UHJvcHMpO1xuICAgIGNvbnN0IHsgdXJsICB9ID0gcHJvcHM7XG4gICAgaWYgKHVybCAhPSBudWxsICYmIHVybCAhPT0gcHJldlByb3BzLnVybCkge1xuICAgICAgICBsYXllci5zZXRVcmwodXJsKTtcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-leaflet/lib/TileLayer.js\n");

/***/ })

};
;