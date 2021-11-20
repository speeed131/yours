<!-- Navbar -->
<template>
  <div class="bg-yellow-500">
    <div class="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-1">
      <div class="relative flex items-center justify-between">
        <div class="flex items-center">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            class="inline-flex items-center mr-8"
          >
            <span class="ml-2 text-xl font-bold tracking-wide text-gray-100"
              >Yours</span
            >
          </a>
        </div>
        <ul v-if="user" class="flex items-center hidden space-x-8 lg:flex">
          <li>
            <a
              href="/"
              aria-label="Sign up"
              title="Sign up"
              class="
                font-bold
                tracking-wide
                text-gray-100
                transition-colors
                duration-200
                hover:text-teal-accent-400
              "
            >
              ユーザー登録
            </a>
          </li>
          <li>
            <a
              href="/"
              aria-label="Sign in"
              title="Sign in"
              class="
                font-bold
                tracking-wide
                text-gray-100
                transition-colors
                duration-200
                hover:text-teal-accent-400
              "
              >ログイン</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      user: true,
    };
  },
};
</script>
