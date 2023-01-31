import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePosts() {
    const posts = ref([])
    const post = ref({})
    const router = useRouter()
    const validationErrors = ref({})

    const getPosts = async (
        category = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        let query = ''
        if (category) {
            query = '&category=' + category
        }
        axios.get('/api/posts?order_column=' + order_column + '&order_direction=' + order_direction + query)
            .then(response => {
                posts.value = response.data.data
            })
    }

    const getPost = async (id) => {
        axios.get('/api/posts/' + id)
            .then(response => {
                post.value = response.data.data
            })
    }

    const storePost = async (post) => {
        axios.post('/api/posts', post)
            .then(response => {
                router.push({ name: 'posts.index' })
            })
            .catch(
                error => {
                    if (error.response?.data) {
                        validationErrors.value = error.response.data.errors
                    }
                }
            )
    }

    const updatePost = async (post) => {
        axios.put('/api/posts/' + post.id, post)
            .then(response => {
                router.push({ name: 'posts.index' })
            })
            .catch(
                error => {
                    if (error.response?.data) {
                        validationErrors.value = error.response.data.errors
                    }
                }
            )
    }


    return {
        posts,
        post,
        getPosts,
        getPost,
        storePost,
        updatePost,
        validationErrors,
    }
}
