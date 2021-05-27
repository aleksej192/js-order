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
        <div class="input-group">
          <label for="orders" class="input-group__label">Выберите сортировку</label>
          <div class="input-group__input input-group__input--select">
            <select class="input" id="orders" v-model="currentOrder">
              <option v-for="(value, key) in orders" v-bind:key="key" :value="key">{{ value }}</option>
            </select>
          </div>
        </div>
        <div class="order-field">
          <draggable v-model="elements">
            <transition-group name="list-complete" tag="div" duration="1000" class="order-field__inner">
              <div
                  v-for="(item) in elements"
                  v-bind:key="item"

                  :class="'number-item list-complete-item '
                  + (activeElement === item ? ' list-complete-item-active ' : ' ')
                  + (compareElement === item ? ' list-complete-item-compare ' : ' ')"

                  @click.prevent.stop="handleClick($event, item)"
              >
                {{ item }}
              </div>
            </transition-group>
          </draggable>
          <vue-simple-context-menu
              :elementId="'test'"
              :options="[{name: 'Удалить', slug: 'remove'}]"
              :ref="'vueSimpleContextMenu'"
              @option-clicked="optionClicked"
          />
          <div class="order-field__btn" @click="sort">
            <svg v-if="isStop" width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.86013 9.37992L1.38862 18.6837L0.666652 0.705176L8.86013 9.37992Z" fill="white"/>
            </svg>
            <svg v-if="!isStop" width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="5" height="17" fill="white"/>
              <rect x="9" width="5" height="17" fill="white"/>
            </svg>
          </div>
          <div class="order-field__btn order-field__btn--2" @click="sortQuick">
            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4603 10.3969L9.6141 19.387L9.62892 1.39391L17.4603 10.3969Z" fill="white"/>
              <path d="M10.4603 10.397L2.6141 19.387L2.62892 1.39397L10.4603 10.397Z" fill="white"/>
            </svg>
          </div>
          <div class="order-field__btn order-field__btn--3" @click="clear">
            <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.69785 16.5048L1.24377 16.7141L1.69785 16.5048ZM7.05811 23.0745L7.32684 22.6528H7.32684L7.05811 23.0745ZM21.0554 23.0744L20.8253 22.6305L21.0554 23.0744ZM26.9678 13.4039L27.4669 13.4332L26.9678 13.4039ZM24.8141 5.17247C24.5495 5.09319 24.2708 5.24336 24.1916 5.50787L22.8996 9.81842C22.8203 10.0829 22.9705 10.3616 23.235 10.4409C23.4995 10.5202 23.7782 10.37 23.8575 10.1055L25.0059 6.27392L28.8375 7.42233C29.102 7.50161 29.3807 7.35145 29.46 7.08693C29.5393 6.82241 29.3891 6.54371 29.1246 6.46443L24.8141 5.17247ZM5.52659 4.10096L5.85428 4.47861L5.85428 4.4786L5.52659 4.10096ZM1.24377 16.7141C2.1625 18.7072 2.96869 20.0408 3.84527 21.0619C4.72581 22.0876 5.65799 22.775 6.78938 23.4961L7.32684 22.6528C6.23168 21.9548 5.39256 21.329 4.60403 20.4105C3.81154 19.4874 3.05087 18.2456 2.15193 16.2955L1.24377 16.7141ZM6.78938 23.4961C11.3195 26.3834 16.6199 25.9369 21.2855 23.5183L20.8253 22.6305C16.3814 24.9341 11.4757 25.2971 7.32684 22.6528L6.78938 23.4961ZM21.2855 23.5183C25.2884 21.4433 27.2601 16.9513 27.4669 13.4332L26.4686 13.3745C26.2763 16.6465 24.4314 20.7612 20.8253 22.6305L21.2855 23.5183ZM27.4669 13.4332C27.5499 12.0217 27.4905 10.9746 27.1303 9.78246C26.7765 8.61159 26.138 7.32092 25.1107 5.41426L24.2303 5.88859C25.2612 7.80194 25.8523 9.01006 26.1731 10.0717C26.4874 11.1121 26.5476 12.0313 26.4686 13.3745L27.4669 13.4332ZM20.2149 2.07014C17.5743 1.30634 15.1885 0.499988 12.8013 0.5C10.3648 0.500012 7.9547 1.33196 5.19889 3.72332L5.85428 4.4786C8.45877 2.21856 10.6432 1.50001 12.8013 1.5C15.0085 1.49999 17.2173 2.24408 19.937 3.03076L20.2149 2.07014ZM5.19889 3.72332C3.45962 5.23253 1.96265 7.34527 1.15029 9.638C0.337511 11.9319 0.19807 14.4456 1.24377 16.7141L2.15193 16.2955C1.24383 14.3255 1.34147 12.0926 2.09287 9.97198C2.84468 7.85014 4.23898 5.88025 5.85428 4.47861L5.19889 3.72332Z" fill="white"/>
            </svg>
          </div>
        </div>
        <random-fill-window ref="randomFillWindow" @listFilled="showSorted"></random-fill-window>
      </div>
      <div class="right">
        <button @click="openRandomModal" class="btn btn-main">Заполнить случайными числами</button>
      </div>
    </div>

    <div class="history-log">
      <div class="history-log__title">История</div>
      <div class="history-log__list">
        <div class="history-log__item" v-for="(item, index) in history" v-bind:key="index">
          <div class="history-log__item-line">Сортировка: {{ item.name }}</div>
          <div class="history-log__item-line">Количество элементов: {{ item.itemsCount }}</div>
          <div class="history-log__item-line">Перемещения: {{ item.currentIterationsCount }} / {{ item.iterationsCount }}</div>
          <div class="history-log__item-line">Сравнения: {{ item.currentComparisonCount }} / {{ item.comparisonCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Bubble from "@/orders/Bubble";
import draggable from 'vuedraggable';
import RandomFillWindow from "@/components/RandomFillWindow";
import {func} from "@/functions";
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import Vue from 'vue'
import Insert from "@/orders/Insert";

Vue.component('vue-simple-context-menu', VueSimpleContextMenu)

export default {
  name: 'App',
  components: {
    RandomFillWindow,
    draggable,
    VueSimpleContextMenu,
  },
  data() {
    return {
      elements: [],
      elementsOld: [],
      addBuffer: null,
      isStop: true,
      history: [],
      orders: {
        "bubble": "Пузырьковая",
        "insert": "Вставками",
      },
      currentOrder: "bubble",
      isChanged: true,
      lastResult: null,
      activeElement: null,
      compareElement: null,
      serializeString: null,
      sortObj: null,
    }
  },
  methods: {
    handleClick (event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item)
    },
    optionClicked (event) {
      let number = event.item;
      this.elements = this.elements.filter((element) => element !== number);
      this.isChanged = true;
    },
    sort: function () {
      this.isStop = !this.isStop;

      if (!this.isStop) {
        this.setElementsOld();
        this.sortObj = this.getSort();

        if (this.serializeString) {
          console.log(JSON.parse(this.serializeString));
          this.sortObj.deserialize(this.serializeString);
          console.log(this.sortObj);
          this.serializeString = null;
        }

        if (this.isChanged) {
          this.pushToHistory(
              this.sortObj.name,
              this.elements.length,
              this.sortObj.resultIterationsCount,
              this.sortObj.resultComparisonCount
          );
          this.sortObj.setItems(this.elements.map((i) => parseInt(i)));
        }

        if (this.sortObj.resultIterationsCount > 0) {
          this.runSortIteration(this.sortObj, this.isChanged && this.lastResult ? null : this.lastResult);
        } else {
          this.isStop = true;
        }

        this.isChanged = false;
      } else {
        this.serializeString = this.sortObj.serialize();
        console.log(JSON.parse(this.serializeString));
      }
    },
    runSortIteration: function (sort, result = null) {
      if (this.isStop) {
        return;
      }

      let th = this;
      // if (isFirst) {
      //   sort.setItems(this.elements.map((i) => parseInt(i)));
      // }
      sort.sort(true);
      result = sort.getResult();
      this.elements = result.items;
      this.setCurrentIterationsCount(result.iterationsCount, result.comparisonCount);
      this.lastResult = result;
      this.activeElement = result.activeElement;
      this.compareElement = result.compareElement;

      if (!result.isSorter) {
        setTimeout(function () {
          th.runSortIteration(sort, result, false);
        }, 1000);
      } else {
        this.isStop = true;
        this.activeElement = null;
        this.compareElement = null;
      }
    },
    sortQuick: function () {
      this.setElementsOld();
      let sort = this.getSort();
      let result = sort.sort(false);
      this.elements = result.items;
      this.isStop = true;
      this.lastResult = result;
      this.activeElement = null;
      this.compareElement = null;

      console.log(result);

      if (this.isChanged)
        this.pushToHistory(
            sort.name,
            this.elements.count,
            result.iterationsCount,
            result.comparisonCount,
            result.comparisonCount,
            result.iterationsCount,
        );
      else
        this.setCurrentIterationsCount(result.iterationsCount, result.comparisonCount);
    },
    clear: function () {
      this.isStop = true;
      this.elements = this.elementsOld.map((i) => i);
      this.isChanged = true;
    },
    setElementsOld: function() {
      this.elementsOld = this.elements.map((i) => i);
    },
    add: function () {
      if (this.addBuffer && func.isUnique(this.elements, this.addBuffer)) {
        this.elements.push(this.addBuffer);
        this.addBuffer = null;
        this.isChanged = true;
      }
    },
    showSorted: function () {
      this.elements = this.$refs.randomFillWindow.result;
      this.isChanged = true;
    },
    openRandomModal: function () {
      this.$refs.randomFillWindow.show();
    },

    pushToHistory: function (name, itemsCount, iterationsCount, comparisonCount, currentComparisonCount = 0, currentIterationsCount = 0) {
      this.history.unshift({
        name: name,
        itemsCount: itemsCount,
        iterationsCount: iterationsCount,
        comparisonCount: comparisonCount,
        currentIterationsCount: currentIterationsCount,
        currentComparisonCount: currentComparisonCount,
      });
    },
    setCurrentIterationsCount: function (iterationsCount, comparisonCount) {
      let item = this.history.shift();
      if (item) {
        item.currentIterationsCount = iterationsCount;
        item.currentComparisonCount = comparisonCount;
        this.history.unshift(item);
      }
    },
    getSort: function () {
      let elements = this.elements.map((i) => parseInt(i));

      switch (this.currentOrder) {
        case "bubble":
          return new Bubble(elements);
        case "insert":
          return new Insert(elements);
      }
    }
  }
}
</script>

<style>
@import "./assets/style.css";
</style>
