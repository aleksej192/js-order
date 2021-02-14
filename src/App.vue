<template>
  <div id="app">
    <h1>Визуализация алгоритмов сортировки</h1>
    <div class="left">
      <div class="input-group">
        <label for="number" class="input-group__label">Введите элементы массива по одному и нажмите enter</label>
        <div class="input-group__input">
          <input v-on:keyup.space="add" v-on:keyup.enter="add" type="number" id="number" class="input" v-model="addBuffer">
          <button @click="add" class="btn">+</button>
        </div>
      </div>
      <div class="order-field">
        <draggable v-model="elements">
          <transition-group name="list-complete" tag="div" duration="1000">
            <span
                v-for="item in elements"
                v-bind:key="item"
                class="number-item list-complete-item"
            >
              {{ item }}
            </span>
          </transition-group>
        </draggable>
      </div>
      <random-fill-window ref="randomFillWindow" @listFilled="dd"></random-fill-window>
      <button @click="shuffle">click</button>
    </div>
  </div>
</template>

<script>

import Bubble from "@/orders/Bubble";
import draggable from 'vuedraggable';
import RandomFillWindow from "@/components/RandomFillWindow";

export default {
  name: 'App',
  components: {
    RandomFillWindow,
    draggable,
  },
  data() {
    return {
      elements: [],
      addBuffer: null
    }
  },
  methods: {
    shuffle: function () {
        let sort = new Bubble(this.elements.map((i) => i));
        let result = sort.sort(true);
        this.elements = result.items;
        let th = this;
        if (!result.isSorter) {
          setTimeout(function () {
            th.shuffle();
          }, 1000);
        }
    },
    add: function () {
      this.elements.push(this.addBuffer);
      this.addBuffer = null;
      this.$refs.randomFillWindow.show();
    },
    dd: function () {
      console.log(this.$refs.randomFillWindow.result);
    }
  }
}
</script>

<style>
@import "./assets/style.css";

.list-complete-item {
  transition: all 0.5s;
  margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
  color: aliceblue;
}

.list-complete-move {
  transform: translateY(-10px);
}
</style>
