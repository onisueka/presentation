export const state = () => ({
  datas: [
    {
      name: 'Frozen Yogurt',
      category: 'Ice cream'
    },
    {
      name: 'Ice cream sandwich',
      category: 'Ice cream'
    },
    {
      name: 'Eclair',
      category: 'Cookie'
    },
    {
      name: 'Cupcake',
      category: 'Pastry'
    },
    {
      name: 'Gingerbread',
      category: 'Cookie'
    },
    {
      name: 'Jelly bean',
      category: 'Candy'
    },
    {
      name: 'Lollipop',
      category: 'Candy'
    },
    {
      name: 'Honeycomb',
      category: 'Toffee'
    },
    {
      name: 'Donut',
      category: 'Pastry'
    },
    {
      name: 'KitKat',
      category: 'Candy'
    }
  ]
})

export const getters = {
  getDatas (state) {
    return state.datas
  }
}

export const mutations = {
  setDatas (state, data) {
    state.datas = [
      ...state.datas,
      data
    ]
  },

  updateDatas (state, data) {
    state.datas = state.datas.map((i) => {
      if (i.name === data.editName) {
        delete data.editName
        i = { ...data }
      }
      return i
    })
  },

  deleteDatas (state, data) {
    state.datas = state.datas.filter(i => i !== data)
  }
}

export const actions = {
  add ({ state, commit }, payload = {}) {
    // add item
    // check duplicate
    const formError = {
      error: false
    }
    if (state.datas.find(i => i.name === payload.name)) {
      formError.error = true
      formError.duplicate = true
      return formError
    }
    commit('setDatas', payload)
    return formError
  },

  update ({ state, commit }, payload = {}) {
    // add item
    // check duplicate
    const formError = {
      error: false
    }
    if (state.datas.find(i => i.name === payload.name && i.name !== payload.editName)) {
      formError.error = true
      formError.duplicate = true
      return formError
    }
    commit('updateDatas', payload)
    return formError
  },

  delete ({ commit }, payload = {}) {
    // delete item
    commit('deleteDatas', payload)
  }
}
