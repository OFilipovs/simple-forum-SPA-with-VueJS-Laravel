<template>
    <div class="mb-4">
        <select v-model="selectedCategory" >
            <option value="" selected>-- Filter by category --</option>
            <option v-for="category in categories" :value="category.id">
                {{ category.name }}
            </option>
        </select>
        <select v-model="orderColumn" >
            <option value="" selected>-- Order by column --</option>
            <option :value="'title'">Title</option>
            <option :value="'created_at'">Created at</option>
            <option :value="'id'">Id</option>
        </select>
        <select v-model="orderDirection" >
            <option value="" selected>-- Order direction --</option>
            <option :value="'asc'">Ascending</option>
            <option :value="'desc'">Descending</option>
        </select>
    </div>
    <table>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Actions</th>
        </tr>
        <tr v-for="post in posts">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.category }}</td>
            <td>{{ post.content }}</td>
            <td>{{ post.created_at }}</td>
            <td><router-link :to="{ name: 'posts.edit', params: {id: post.id} }">Edit</router-link></td>
        </tr>
    </table>
</template>

<script>

    import { ref, onMounted, watch } from "vue";
    import usePosts from "../../composables/posts";
    import useCategories from "../../composables/categories";

    export default {
        setup() {
            const selectedCategory = ref('');
            const orderColumn = ref('');
            const orderDirection = ref('');
            const { posts, getPosts } = usePosts()
            const { categories, getCategories } = useCategories()
            onMounted(() => {
                getPosts()
                getCategories()
            })

            watch(selectedCategory, (current, previous) => {
                getPosts(current, orderColumn.value, orderDirection.value)
            })

            watch([orderColumn, orderDirection], ([currentColumn, currentDirection], [previousColumn, previousDirection]) => {
                console.log("Order column:", currentColumn, "Order direction:", currentDirection);
                getPosts(selectedCategory.value, currentColumn, currentDirection)
            })

            return {
                posts,
                categories,
                selectedCategory,
                orderColumn,
                orderDirection,
            }
        }
    }
</script>

<style>
    th {
        padding: 20px;
    }

</style>
