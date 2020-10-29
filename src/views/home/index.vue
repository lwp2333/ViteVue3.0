<template>
  <h1>Hello Vite and vue3.0</h1>
  <button @click="add">count is: {{ count }}</button>
  <h2>Hello {{ person.name }}, now you are {{ person.age }} years old</h2>
  <p>you can click the button to change your age</p>
  <button @click="increaseAge">增加</button>
  <button @click="decreaseAge">减少</button>

  <button @click="set">设置剩余时间55年</button>
  {{ remainAge }}
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useStore, mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  setup() {
    const Store = useStore()
    let count = ref(0)
    const person = reactive({
      ...Store.state.author
    })

    const add = () => {
      count.value++
    }
    const addAge = () => {
      person.age++
    }
    const increaseAge = () => {
      person.age++
    }
    const decreaseAge = () => {
      person.age--
    }
    let remainAge = computed({
      get: () => {
        return 100 - person.age
      },
      set: value => {
        person.age = 100 - value
      }
    })
    const set = () => {
      remainAge = 55
      console.log(person.age)
    }
    watch(
      () => person.age,
      (curr, pre) => {
        console.log('person 改变了', curr, pre)
      }
    )

    return {
      count,
      add,
      person,
      increaseAge,
      decreaseAge,
      remainAge,
      set
    }
  }
}
</script>

<style lang="scss" scoped></style>
