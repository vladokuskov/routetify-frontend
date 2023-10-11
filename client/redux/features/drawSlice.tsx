import { DrawInfo, DrawState } from '@/types/global/redux.types'
import { DrawCoords } from '@/types/models/drawCoords.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: DrawState = {
  drawInfo: { time: null, dist: null },
  drawCoords: [], // Markers & polyline
  drawCoordsDeleted: [], // Coords that are deleted using undo
  drawCoordsChanges: [],
  activeWaypointIndex: null,
}

export const drawReducer = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    reverseRoute: (state) => {
      if (state.drawCoords.length === 0) return state

      const reversedCoords = [...state.drawCoords].reverse()

      return {
        ...state,
        drawCoords: reversedCoords,
        drawCoordsDeleted: [],
        drawCoordsChanges: [],
      }
    },

    updateDrawInfo: (state, action: PayloadAction<DrawInfo | null>) => {
      return {
        ...state,
        drawInfo: {
          ...state.drawInfo,
          time: action.payload?.time ? action.payload.time : null,
          dist: action.payload?.dist ? action.payload.dist : null,
        },
      }
    },
    putDrawCoords: (state, action: PayloadAction<DrawCoords[]>) => {
      return {
        ...state,
        drawCoords: action.payload,
        drawCoordsDeleted: [],
        drawCoordsChanges: [],
      }
    },
    updateDrawCoords: (state, action: PayloadAction<DrawCoords>) => {
      if (
        state.activeWaypointIndex !== null &&
        state.activeWaypointIndex < state.drawCoords.length
      ) {
        let updatedActiveIndex = state.activeWaypointIndex + 1

        const updatedDrawCoords = [...state.drawCoords]

        updatedDrawCoords.splice(updatedActiveIndex, 0, {
          lat: action.payload.lat,
          lng: action.payload.lng,
        })

        return {
          ...state,
          drawCoords: updatedDrawCoords,
          drawCoordsDeleted: [],
          drawCoordsChanges: [
            ...state.drawCoordsChanges,
            {
              lat: action.payload.lat,
              lng: action.payload.lng,
              index: updatedActiveIndex,
            },
          ],
          activeWaypointIndex: updatedActiveIndex,
        }
      } else {
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
          drawCoordsChanges: [
            ...state.drawCoordsChanges,
            {
              lat: action.payload.lat,
              lng: action.payload.lng,
              index: state.drawCoords.length,
            },
          ],
        }
      }
    },
    undoDrawCoords: (state, action: PayloadAction<void>) => {
      if (state.drawCoordsChanges.length === 0) return state
      const updatedDrawCoords = [...state.drawCoords]
      const updatedDrawCoordsChanges = [...state.drawCoordsChanges]
      const lastChange = updatedDrawCoordsChanges.pop()

      if (lastChange) {
        updatedDrawCoords.splice(lastChange.index, 1)

        return {
          ...state,
          drawCoords: updatedDrawCoords,
          drawCoordsDeleted: [...state.drawCoordsDeleted, lastChange],
          drawCoordsChanges: updatedDrawCoordsChanges,
          activeWaypointIndex: lastChange.index - 1,
        }
      }
    },
    redoDrawCoords: (state, action: PayloadAction<void>) => {
      if (state.drawCoordsDeleted.length === 0) return state
      const updatedDrawCoords = [...state.drawCoords]
      const updatedDrawCoordsDeleted = [...state.drawCoordsDeleted]
      const lastDeletedChange = updatedDrawCoordsDeleted.pop()

      if (lastDeletedChange) {
        updatedDrawCoords.splice(lastDeletedChange.index, 0, {
          lat: lastDeletedChange.lat,
          lng: lastDeletedChange.lng,
        })

        return {
          ...state,
          drawCoords: updatedDrawCoords,
          drawCoordsDeleted: updatedDrawCoordsDeleted,
          drawCoordsChanges: [...state.drawCoordsChanges, lastDeletedChange],
          activeWaypointIndex: lastDeletedChange.index,
        }
      }
    },
    deleteDrawCoords: (state, index) => {
      if (state.drawCoords.length === 0) return
      if (state.drawCoords.length !== 0) {
        return {
          ...state,
          drawCoordsDeleted: [],
          drawCoords: [],
          drawCoordsChanges: [],
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
    updateActiveWaypoint: (
      state,
      action: PayloadAction<{
        newIndex: number | null
      }>,
    ) => {
      return {
        ...state,
        activeWaypointIndex: action.payload.newIndex,
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
  updateActiveWaypoint,
} = drawReducer.actions
export default drawReducer.reducer
