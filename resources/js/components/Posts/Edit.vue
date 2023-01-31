<template>
    <form @submit.prevent="updatePost(post)">
        <!-- Title -->
        <div>
            <label for="post-title" class="block font-medium text-sm text-gray-700">
                Title
            </label>
            <input v-model="post.title" id="post-title" type="text" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <div>
                <span class="error" v-for="message in validationErrors?.title">
                    {{ message }}
                </span>
            </div>
        </div>

        <!-- Content -->
        <div class="mt-4">
            <label for="post-content" class="block font-medium text-sm text-gray-700">
                Content
            </label>
            <textarea v-model="post.content" id="post-content" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
            <div>
                <span class="error" v-for="message in validationErrors?.content">
                    {{ message }}
                </span>
            </div>
        </div>

        <!-- Category -->
        <div class="mt-4">
            <label for="post-category" class="block font-medium text-sm text-gray-700">
                Category
            </label>
            <select v-model="post.category_id" id="post-category" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" selected>-- Choose category --</option>
                <option v-for="category in categories" :value="category.id">
                    {{ category.name }}
                </option>
            </select>
            <div>
                <span class="error" v-for="message in validationErrors?.category_id">
                    {{ message }}
                </span>
            </div>
        </div>

        <!-- Buttons -->
        <div class="mt-4">
            <button >Save</button>
        </div>
    </form>
</template>

<script>

import { onMounted } from "vue";
import { useRoute } from "vue-router";
import useCategories from "../../composables/categories";
import usePosts from "../../composables/posts";

export default {
    setup() {

        const { categories, getCategories } = useCategories()
        const { post, getPost, updatePost, validationErrors } = usePosts()
        const route = useRoute()

        onMounted(() => {
            getCategories()
            getPost(route.params.id)

        })

        return {
            categories,
            post,
            validationErrors,
            updatePost
        }
    }
}
</script>

<style>
button {
    padding: 0.5em 1em;
    background-color: #3490dc;
}

.error {
    color: red;
}
</style>




