import fetch from 'isomorphic-fetch'

const constants = require('../constants')

function toggleFilters(){
  return {
    type: constants.TOGGLE_FILTERS,
    receivedAt: Date.now()
  }
}

function changeFilter(filter, value){
  return {
    type: constants.CHANGE_FILTER,
    payload: { filter: filter, value: value },
    receivedAt: Date.now()
  }
}

module.exports = { toggleFilters, changeFilter }
