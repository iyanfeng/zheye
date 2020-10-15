import { createStore } from 'vuex'
import axios from 'axios'
interface UserPros {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  columnId?: number;
}
export interface AvatarProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: AvatarProps;
  description: string;
}
interface PostProps {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: AvatarProps;
  createdAt: string;
  column: string;
}
interface GlobalDataProps {
  user: UserPros;
  column: ColumnProps[];
  posts: PostProps[];
}
const store = createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: true,
      nickName: 'yanfeng',
      columnId: 1
    },
    column: [],
    posts: []
  },
  getters: {
    getPostsData: (state) => (id: string) => {
      return state.posts.filter((item) => item.column === id)
    },
    getColunm: (state) => (id: string) => {
      return state.column.find((item) => item._id === id)
    }
  },
  actions: {
    async fetchColums ({ commit }) {
      const { data } = await axios.get('/api/columns')
      commit('fetchColums', data.data)
    },
    async fetchColum ({ commit }, id) {
      const { data } = await axios.get(`/api/columns/${id}`)
      commit('fetchColum', data.data)
    },
    async fetchPosts ({ commit }, id) {
      const { data } = await axios.get('/api/columns/' + id + '/posts')
      commit('fetchPosts', data.data)
    }
  },
  mutations: {
    fetchColums (state, result) {
      state.column = result.list
    },
    fetchColum (state, result) {
      state.column = [result]
      console.log(state.column)
    },
    fetchPosts (state, result) {
      state.posts = result.list
    },
    login (state) {
      state.user = {
        ...state.user,
        isLogin: true,
        nickName: 'yanfeng',
        _id: '1'
      }
    },
    pushPost (state, newPost) {
      state.posts.push(newPost)
    }
  }
})
export default store
