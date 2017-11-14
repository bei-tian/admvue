<template>
    <div class="theme-index">
        <div @click="setTheme('default')">默认主题</div>
        <div @click="setTheme('theme1')">主题1</div>
    </div>
</template>
<script>

    export default {
        data() {
            return {

            }
        },
        methods: {
            setTheme(theme) {
                let themeLink = document.querySelector('link[name="theme"]');
                themeLink.setAttribute('href', '/dist/themes/'+ theme +'/index.css');
            },
        }
    }
</script>
