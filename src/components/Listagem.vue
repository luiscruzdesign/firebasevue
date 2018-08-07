<template>
  <ul>
    <li v-for="(itemName,key) in items" :key="key">
      <div>
        <strong>{{itemName.name}} ({{itemName.total}})</strong>
        <p v-if="itemName.description">{{itemName.description}}</p>
      </div>
      <div>
        <span>Impact ({{itemName.impact}}) Conficence ({{itemName.confidence}}) Ease ({{itemName.ease }})</span>
      </div>
      <div>
        <button class="btn btn-xs btn-primary" v-model="editForm[key]" @click="editItem(key)">Edit</button>
        <button class="btn btn-xs btn-primary" @click="deleteItem(key)">Delete</button>
      </div>
      <!--
      <button class="btn btn-xs btn-primary">Edit</button>
      <button class="btn btn-xs btn-primary" @click="deleteItem(key)">Delete</button>
      <input type="text" v-model="editForm[key]" class="form-control" @keyup.enter="editItem(key)">
      -->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Listagem',
  data () {
    return {
      items: [],
      editForm: []
    }
  },
  methods: {
    deleteItem(key) {
      firebase.database().ref('items/' + key).remove();
    }
  },
  created() {
    firebase.database().ref('items').orderByChild('total').on('value', (snapshot)=> {
      console.log(snapshot.val());
      this.items=snapshot.val();
    })
  }
}
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    text-align: left;
    list-style-type: none;
    padding: 10px 20px;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li:first-of-type {
    border-top: 1px solid #e4e4e4;
  }
  li div:nth-of-type(1) {
    width: 30%;
  }
  li div:nth-of-type(2) {
    width: 50%;
  }
  li div:nth-of-type(3) {
    width: 20%;
    text-align: right;
  }
  p {
    margin: 10px 0 0 0;
  }
</style>
