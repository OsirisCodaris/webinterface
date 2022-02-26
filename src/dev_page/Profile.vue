<template>
  <div class="starter-page">
    
    <div class="section text-center">
        <alert type="success" v-if="$date().isBefore($date(subscribe.finishedat)) && subcribe!=null">
            Votre abonnement Academia expire dans {{this.$date(subscribe.finishedat).diff($date(), 'd')}} jours - <strong>{{this.$date(subscribe.finishedat).format('DD MMMM YYYY')}}</strong>
        </alert>
        <alert type="danger" v-else-if=subcribe>
            Votre abonnement Academia est terminé {{this.$date(subscribe.finishedat).fromNow()}} - <strong>{{this.$date(subscribe.finishedat).format('DD MMMM YYYY')}}</strong> Veuillez vous réabonner !
        </alert>
        <alert type="info" v-else>
            Abonnez-vous et profitez de plus de documents - <strong>PREMIUM</strong>
        </alert>
      <div class="row">
            <div class="col-12 text-center mb-4">
                <h3>ACTIVATION PREMIUM</h3>
                <h6 v-if="$store.state.user.role == 'STUDENT'">Compte : {{$store.state.user.fullname}} / Classe : {{findnamemod}}</h6>
                <h6 v-else>Compte : {{$store.state.user.fullname}} / Matière : {{findnamemod}}</h6>
            </div>
            <div class="container">
                <form  @submit.prevent=submit>
                    <div >
                         <b-form-group label="Sélectionner un forfait" v-slot="{ ariaDescribedby }">
                            <b-form-radio-group
                            v-model="selectedRef"
                            class="mb-3"
                            :aria-describedby="ariaDescribedby"
                            required
                            >
                            <span v-for="ref in refs" v-bind:key="ref.idrefs">
                                <b-form-radio :value="ref.idrefs">
                                <card style="height : 200px" :raised=true :color="selectedRef == ref.idrefs ? 'green' : 'black'">
                                    <h4 class="card-title">{{ref.name}}</h4>
                                    <p class="card-text">{{ref.day}} jours = {{ref.price}} F CFA</p>
                                </card>
                            </b-form-radio>
                            </span>
                            </b-form-radio-group>
                         </b-form-group>
                    </div>
                        
                    <div class="mb-2" >
                        
                                <div class="row ">
                                <div class="col-md-3 col-sm-12">
                                    <b-form-select
                                        id="inline-form-custom-select-pref"
                                        class=" mr-sm-2 mb-sm-0"
                                        v-model="operator"
                                        :options="[{ text: 'Opérateur...', value: null , disabled: true},  {text: 'Airtel Money', value: 'AM' },{text: 'Moov Money', value: 'MC' }]"
                                        :value="null"
                                        required
                                    ></b-form-select>
                                </div>
                                <div class="col-md-9 col-sm-12 mt-1">
                                    <b-input class="no-border form-control-lg"
                                        required
                                        v-model="phone"
                                        placeholder="Entrer un numéro de mobile money..."
                                        addon-left-icon="now-ui-icons tech_mobile"
                                        type="number" 
                                        label='test'
                                        >
                                    </b-input>
                                </div>
                                </div>
                    </div>
                        
                    <div class="mb-2 mt-3 ">
                        <div class="row text-center">
                            <div class="col-md-3 col-sm-12 mt-2 mx-auto">
                                <n-checkbox v-model="checkCode">Code promoteur (facultatif)</n-checkbox>
                            </div>
                            <div class="col-md-9 col-sm-12" v-show="checkCode">
                                <fg-input  class="no-border form-control-lg"
                                v-model="codePromo"
                                placeholder="Entrez code promoteur"
                                addon-left-icon="now-ui-icons objects_key-25"
                                >
                                </fg-input>
                            </div>
                            
                        </div>
                        
                    </div>

                    <n-button type="success" nativeType='submit'   round wide
                        ><i class="now-ui-icons ui-1_send"></i> Payer
                        <div class="fas fa-spinner fa-pulse" v-if="isloading"></div>
                    </n-button>
                </form>
                <alert type="success" dismissible v-if="success">
                    <div class="alert-icon">
                        <i class="now-ui-icons ui-2_like"></i>
                        </div>
                        <strong>Transaction initialisée !</strong> Vérifiez le téléphone ayant mobile money pour confirmer le payement
                </alert>
                <alert type="danger" dismissible v-if="error">
                    <div class="alert-icon">
                        <i class="now-ui-icons ui-2_unlike"></i>
                        </div>
                        <strong>Echec transaction !</strong> {{error}}
                </alert>
            </div>
      </div>
      <div class="row m-2">
            <b-button @click="toggleBusy" variant="outline-secondary" squared size="sm">
                Actualiser
            </b-button>
            <b-table :items="transactions" :busy="isBusy" :fields="fields" class="my-auto" outlined striped hover responsive>
                <template #table-busy>
                    <div class="text-center text-success my-2">
                    <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
                    </div>
                </template>
                <template #cell(status)="row">
                    
                    <span>
                        <i v-if="row.item.status == '200'" class="now-ui-icons loader_refresh"></i>
                        <i v-else-if="row.item.status == '201'" class="now-ui-icons ui-1_check text-success"></i>
                        <i v-else class="now-ui-icons ui-1_simple-remove text-danger"></i>
                    </span>
                </template>
                <template #cell(show_details)="row">
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Cacher' : 'Voir'}} Détails
                    </b-button>
                </template>
                <template #row-details="row">
                    <card style="height: auto">
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Statut :</b></b-col>
                        <b-col>{{ row.item.status == '200' ? 'En cours' :  row.item.status == '201' ? 'Réussie' : 'Echec'}}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Commentaire :</b></b-col>
                        <b-col>{{ row.item.message }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Créée le :</b></b-col>
                        <b-col>{{ $date(row.item.createdAt).format('DD MMMM YYYY HH:mm:ss') }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Dernière mise à jour le :</b></b-col>
                        <b-col>{{ $date(row.item.updatedAt).format('DD MMMM YYYY HH:mm:ss') }}</b-col>
                    </b-row>
                    <b-button variant="warning" :href="whatsapp(row)" target="blank"><i class="now-ui-icons ui-2_chat-round" ></i> Réclamation</b-button>
                </card>
      </template>
            </b-table>

      </div>
    
    </div>
    </div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput as FgInput,Radio,Checkbox } from '@/components'
import RefService from '@/services/RefService'
import TransacService from '@/services/TransacService'
import SubscriberService from '@/services/SubscriberService'
import ClasseService from '@/services/ClasseService'
import SubjectService from '@/services/SubjectService'

export default {
  name: 'starter',
  components: {
    Card,
    Alert,
    [Radio.name]: Radio,
    [Button.name]: Button,
    FgInput,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
        number: '+24174082346',
        isBusy: false,
        selectedRef:'',
        fields :[{label:'#',key:'key'}, {label:'Forfait',key:'refs'}, {label:'Montant',key:'price'},{label:'Téléphone',key:'phone'},{label:'Statut',key:'status'},{label:'Détails',key:'show_details'} ],
        refs :[],
        transactions:[],
        operator:null,
        phone:'',
        codePromo:'',
        subscribe:{},
        checkCode:false,
        isloading:false,
        error: false,
        success : false,
        classes:[],
        subjects:[],
        nameModule:''
    }
  },
  computed:{
      findnamemod(){
          if(this.$store.state.user.role == 'STUDENT'){
                return (this.classes.find(el => el.idclasses == this.$store.state.user.module )).name
          }else{
                return (this.subjects.find(el => el.idsubjects == this.$store.state.user.module )).name   
          }     
      }
  },
  methods:{
      async submit(e){
          e.preventDefault();
          this.isloading = true;
          this.error = false;
          this.success = false;
        var data = {
            "phone": this.phone,
            "operateur": this.operator,
            "idrefs": this.selectedRef,
            "codes": this.codePromo
        }

         try {
            const response= (await TransacService.purchase(data)).data
                this.isloading = false
                this.success = true
                this.phone = this.selectedRef = this.operator = this.codePromo = null
            } catch (error) {
                this.error = error.response.data.error
                
            } finally{
                await this.toggleBusy()
                this.isloading = false
            }
                
            

      },
      async toggleBusy() {
        this.isBusy = !this.isBusy
        await this.refresh()
        this.isBusy = !this.isBusy

      },
      async refresh () {
          try {
            this.transactions = (await TransacService.index(this.$store.state.user.idusers)).data.rows
            this.subscribe = (await SubscriberService.index(this.$store.state.user.idusers)).data
            } catch (error) {}
      },
      whatsapp(row){
            const mess = `Transaction : ${row.item.key}  %0aCréée le : ${this.$date(row.item.createdAt).format('DD MMMM YYYY HH:mm:ss')} %0aStatut : ${row.item.status} %0aCommentaire : ${row.item.message} %0a%0a*Veuillez ne pas supprimer les lignes précédentes* %0a%0a _Entrez votre réclamation_ %0a%0a`
            return "https://api.whatsapp.com/send?phone="+this.number+"&text="+mess
      }
  },

  async mounted() {
    try {
      this.refs = (await RefService.index()).data.rows
      this.classes = (await ClasseService.index()).data.rows
      this.subjects = (await SubjectService.index()).data.rows
      await this.refresh()
    } catch (error) {}
  },
}
</script>
<style scoped>
.starter-page {
  min-height: calc(100vh - 95px);
}
.card {
  height: 360px;
}
img {
  height: 280px;
}
</style>
