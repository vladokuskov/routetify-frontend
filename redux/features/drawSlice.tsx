import { DrawState } from '@/types/global/redux.types'
import { DrawCoords } from '@/types/models/drawCoords.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  drawInfo: { time: '0', dist: '0' },
  drawCoords: [], // Coords that used for rendering Markers & polyline
  drawCoordsDeleted: [], // Coords that are deleted
  drawCoordsFuture: [], // Coords that can be recovered
} as DrawState

export const drawReducer = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    reverseRoute: (state) => {
      if (state.drawCoords.length === 0) return

      const reversedCoords = []
      for (let i = state.drawCoords.length - 1; i >= 0; i--) {
        reversedCoords.push(state.drawCoords[i])
      }

      return {
        ...state,
        drawCoords: reversedCoords,
        drawCoordsFuture: [],
        drawCoordsDeleted: [],
      }
    },
    updateDrawInfo: (
      state,
      action: PayloadAction<{ time: string; dist: string }>,
    ) => {
      return {
        ...state,
        drawInfo: {
          ...state.drawInfo,
          time: action.payload.time,
          dist: action.payload.dist,
        },
      }
    },
    putDrawCoords: (state, action: PayloadAction<DrawCoords[]>) => {
      return {
        ...state,
        drawCoords: action.payload,
        drawCoordsDeleted: [],
        drawCoordsFuture: [],
      }
    },
    updateDrawCoords: (state, action: PayloadAction<DrawCoords>) => {
      return {
        ...state,
        drawCoords: [
          ...state.drawCoords,
          {
            lat: action.payload.lat,
            lng: action.payload.lng,
          },
        ],
        drawCoordsDeleted: [],
        drawCoordsFuture: [],
      }
    },
    undoDrawCoords: (state, index) => {
      if (state.drawCoords.length === 0) return
      if (state.drawCoords.length !== 0) {
        return {
          ...state,
          drawCoordsFuture: [
            ...state.drawCoordsFuture,
            ...state.drawCoords.slice(-1),
          ],
          drawCoords: state.drawCoords.filter(
            (item, index) => index !== state.drawCoords.length - 1,
          ),
        }
      }
    },
    redoDrawCoords: (state, index) => {
      if (state.drawCoordsDeleted.length === 0) {
        return {
          ...state,
          drawCoords: [
            ...state.drawCoords,
            ...state.drawCoordsFuture.slice(-1),
          ],
          drawCoordsFuture: [
            ...state.drawCoordsFuture.filter(
              (item, index) => index !== state.drawCoordsFuture.length - 1,
            ),
          ],
        }
      } else if (
        state.drawCoordsFuture.length === 0 &&
        state.drawCoordsDeleted.length > 0
      ) {
        return {
          ...state,
          drawCoords: [...state.drawCoordsDeleted],
          drawCoordsDeleted: [],
        }
      }
    },
    deleteDrawCoords: (state, index) => {
      if (state.drawCoords.length === 0) return
      if (state.drawCoords.length !== 0) {
        return {
          ...state,
          drawCoordsDeleted: [...state.drawCoords],
          drawCoords: [],
          drawCoordsFuture: [],
          exportCoords: [],
        }
      }
    },
    updateDraggedMarkerCoords: (
      state,
      action: PayloadAction<{
        i: number
        newCoords: DrawCoords
      }>,
    ) => {
      const { i, newCoords } = action.payload

      const updatedCoords = state.drawCoords.map((coord, index) => {
        if (index === i) {
          return {
            lat: newCoords.lat,
            lng: newCoords.lng,
          }
        }
        return coord
      })

      return {
        ...state,
        drawCoords: updatedCoords,
      }
    },
  },
})

export const {
  updateDrawInfo,
  updateDrawCoords,
  deleteDrawCoords,
  undoDrawCoords,
  redoDrawCoords,
  updateDraggedMarkerCoords,
  putDrawCoords,
  reverseRoute,
} = drawReducer.actions
export default drawReducer.reducer
