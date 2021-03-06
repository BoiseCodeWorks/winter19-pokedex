import Store from "../store.js";
import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

// @ts-ignore
let _sandbox = axios.create({
  baseURL:'https://bcw-sandbox.herokuapp.com/api/Winter19/pokemon',
  timeout:3000
})

// @ts-ignore
let _pokeApi = axios.create({
  baseURL:'https://pokeapi.co/api/v2/pokemon',
  timeout:3000
})

class PokemonService {
  async releaseAsync() {
    let res = await _sandbox.delete(store.State.activePokemon._id);
    this.getMyPokemonAsync();
    store.commit("activePokemon", {});
    console.log("release", res);
    
  }
  selectCaughtPokemon(id) {
    let caughtPokemon=store.State.caughtPokemon.find(elem=>elem._id==id);
    console.log(caughtPokemon);
    store.commit("activePokemon",caughtPokemon)
  }
  async catchAsync() {
    let activePokemon = store.State.activePokemon; 
    let res = await _sandbox.post("", activePokemon); 
    console.log("from catchAsycn", res);
    this.getMyPokemonAsync() 
    console.log("from store ", store.State.caughtPokemon);
    
  }

  async getMyPokemonAsync() {
    let res = await _sandbox.get("");
    store.commit("caughtPokemon", res.data.data.map(pokemonData => new Pokemon(pokemonData))) // this takes pokemon pojos and turns them into pokemon
    console.log("caught pokemon", store.State.caughtPokemon);
    
    

  }


   async selectPokemonAsync(name) {
let res = await _pokeApi.get(name);
console.log("from select Pokemon res", res);
let theActivePokemon = new Pokemon(res.data);
store.commit("activePokemon", theActivePokemon);
console.log("from store", store.State.activePokemon);

  }  
  async getWildPokemonAsync(){
    let res = await _pokeApi.get('')
    store.commit("pokemon", res.data.results)
  
  }
  constructor(){
  }
}

const service = new PokemonService();
export default service;
