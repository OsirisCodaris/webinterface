<template>
  <div class="section section-about-us">
    <div class="container" mt-5>
      <iframe src="file/file.pdf#toolbar=0" width="100%" height="1000px">
      </iframe>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf,
  },
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
    }
  },
}
</script>
