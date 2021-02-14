<template>
  <vue-modal-2 :name="windowName" @on-close="close" noHeader>
    <template v-slot:footer>
      <button @click="run" class="btn btn-main window__btn">Сгенерировать</button>
    </template>
    <div class="window__content">
      <div class="window__content-group">
        <div class="window__title">Количество элементов в массиве</div>
        <vue-slider v-model="rangeCount" :tooltip="'always'"></vue-slider>
      </div>
      <div class="window__content-group">
        <div class="window__title">Диапозон чисел в массиве</div>
        <vue-slider v-model="rangeNumbers" :tooltip="'always'"></vue-slider>
      </div>
    </div>
  </vue-modal-2>
</template>

<script>

const windowName = 'random-fill-window';

export default {
  name: "RandomFillWindow",
  data() {
    return {
      rangeCount: 2,
      rangeNumbers: [0, 100],
      windowName: windowName,
      result: []
    };
  },
  methods: {
    show: function () {
      this.$vm2.open(this.windowName);
    },
    close: function () {
      this.$vm2.close(this.windowName);
    },
    run: function () {
      function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }

      for (let i = 0; i < this.rangeCount; i++) {
        this.result.push(getRandomArbitrary(this.rangeNumbers[0], this.rangeNumbers[1]));
      }

      this.$emit('listFilled');

      this.close();
    }
  }
}
</script>