<template>
  <div id="app">
    <h1>Визуализация алгоритмов сортировки</h1>
    <div class="container">
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
            <transition-group name="list-complete" tag="div" duration="1000" class="order-field__inner">
              <span
                  v-for="(item) in elements"
                  v-bind:key="item"
                  class="number-item list-complete-item"
              >
                {{ item }}
              </span>
            </transition-group>
          </draggable>
          <div class="order-field__btn" @click="sort">
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.86013 9.37992L1.38862 18.6837L0.666652 0.705176L8.86013 9.37992Z" fill="white"/>
            </svg>
          </div>
          <div class="order-field__btn order-field__btn--2" @click="pause">
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.86013 9.37992L1.38862 18.6837L0.666652 0.705176L8.86013 9.37992Z" fill="white"/>
            </svg>
          </div>
        </div>
        <random-fill-window ref="randomFillWindow" @listFilled="showSorted"></random-fill-window>
      </div>
      <div class="right">
        <button @click="openRandomModal" class="btn btn-main">Заполнить случайными числами</button>
      </div>
    </div>
  </div>
</template>

<script>

import Bubble from "@/orders/Bubble";
import draggable from 'vuedraggable';
import RandomFillWindow from "@/components/RandomFillWindow";
import {func} from "@/functions";

export default {
  name: 'App',
  components: {
    RandomFillWindow,
    draggable,
  },
  data() {
    return {
      elements: [],
      addBuffer: null,
      isStop: false
    }
  },
  methods: {
    sort: async function () {
      this.isStop = false;
      this.runSortIteration();
    },
    runSortIteration: function () {
      if (this.isStop) {
        return;
      }
      let th = this;
      let sort = new Bubble(this.elements.map((i) => i));
      let result = sort.sort(true);
      this.elements = result.items;
      if (!result.isSorter) {
        setTimeout(function () {
          th.runSortIteration();
        }, 1000);
      }
    },
    sortQuick: function () {
      let sort = new Bubble(this.elements.map((i) => i));
      let result = sort.sort();
      this.elements = result.items;
    },
    pause: function () {
      this.isStop = true;
    },
    add: function () {
      if (this.addBuffer && func.isUnique(this.elements, this.addBuffer)) {
        this.elements.push(this.addBuffer);
        this.addBuffer = null;
      }
    },
    showSorted: function () {
      this.elements = this.$refs.randomFillWindow.result;
    },
    openRandomModal: function () {
      this.$refs.randomFillWindow.show();
    }
  }
}
</script>

<style>
@import "./assets/style.css";
</style>
