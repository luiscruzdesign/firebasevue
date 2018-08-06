<template>
  <div>
    <input type="text" v-model="item" @keyup.enter="addItem">
    <ul>
      <li v-for="(itemName,key) in items" :key="key">
        <h3>{{itemName.name}}</h3>
        <button class="btn btn-xs btn-primary">Edit</button>
        <button class="btn btn-xs btn-primary" @click="deleteItem(key)">Delete</button>
        <input type="text" v-model="editForm[key]" class="form-control" @keyup.enter="editItem(key)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      item: null,
      items: [],
      editForm: []
    }
  },
  methods: {
    addItem() {
      firebase.database().ref('items').push({name: this.item})
      .then((data)=>{console.log(data)})
      .catch((error)=>{console.log(error)});
    },
    editItem(key) {
      firebase.database().ref('items/' + key).set({
        name: this.editForm[key]
      })
    },
    deleteItem(key) {
      firebase.database().ref('items/' + key).remove();
    }
  },
  created() {
    firebase.database().ref('items').on('value', (snapshot)=> {
      //console.log(snapshot.val());
      this.items=snapshot.val();
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
