<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">Novo cliente</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="px-0">
              <v-text-field
                label="Nome"
                placeholder="Jhon Doe"
                v-model="name"
                autofocus
                required
                @keydown.enter="criarNovoCliente"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="px-0">
              <v-text-field
                label="Descrição"
                placeholder="Lorem ipsum dolor sit amet"
                v-model="description"
                @keydown.enter="criarNovoCliente"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="show = !show">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="criarNovoCliente">Salvar cliente</v-btn>
      </v-card-actions>
    </v-card>
    <!--  -->
    <SimpleAlert
      v-model="dialog.show"
      :message="dialog.message"
      :title="dialog.title"
      :ok="dialog.ok"
      :yes="dialog.yes"
      :no="dialog.no"
      :cancel="dialog.cancel"
    ></SimpleAlert>
  </v-dialog>
</template>

<script>
import SimpleAlert from './SimpleAlert.vue';

export default {

  components: {
    SimpleAlert,
  },

  props: {
    value: Boolean,
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    clientes() {
      return this.$store.state.clientes;
    },
  },

  data() {
    return {
      name: null,
      description: null,
      //
      dialog: {
        show: false,
        title: null,
        message: null,
        ok: null,
        yes: null,
        no: null,
        cancel: null,
      },
    };
  },

  methods: {

    showOnEmpty() {
      this.dialog.title = 'Ops!';
      this.dialog.message = 'Preencha todos os campos!';
      this.dialog.ok = () => {
        this.dialog.show = false;
      };
      this.dialog.show = true;
    },

    showClienteCadastrado() {
      this.dialog.title = 'Ops!';
      this.dialog.message = 'Esse cliente já está cadastrado!';
      this.dialog.ok = () => {
        this.dialog.show = false;
      };
      this.dialog.show = true;
    },

    criarNovoCliente() {
      if (this.name === null) {
        this.showOnEmpty();
        return;
      }
      if (this.clientes.find((item) => item.name === this.name) != null) {
        this.showClienteCadastrado();
        return;
      }
      const cliente = {
        id: this.clientes.length + 1,
        name: this.name,
        description: this.description,
      };
      this.clientes.push(cliente);
      this.$store.commit('setClientes', this.clientes);
      this.show = !this.show;
      this.name = null;
      this.description = null;
    },

  },

};
</script>
