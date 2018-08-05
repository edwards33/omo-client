<template>
	<div class="container">
		<div class="row main">
			<div class="main-login main-center">
				<h5>Sign Up</h5>
                <div v-show="loading" class="loader"></div>
				<form v-show="!loading" id="signup-form" @submit.prevent="createAccount">
                    <div class="form-group">
						<label for="name" class="cols-sm-2 control-label">Name</label>
						<div class="cols-sm-10">
							<div class="input-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
								<input 
                                    type="text" 
                                    :class="{ 'form-control': true, 'is-danger': errors.has('name') }" 
                                    name="user" 
                                    placeholder="User name" 
                                    v-model="name" 
                                    v-validate="'required'"
                                >
                            </div>
                            <span 
                                v-show="errors.has('name')" 
                                class="help is-danger"
                            >
                                {{ errors.first('name') }}
                            </span>
						</div>
					</div>
					<div class="form-group">
						<label for="email" class="cols-sm-2 control-label">Email</label>
						<div class="cols-sm-10">
							<div class="input-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
								<input 
                                    type="email" 
                                    :class="{ 'form-control': true, 'is-danger': errors.has('email') }" 
                                    name="email" 
                                    placeholder="your@email.com" 
                                    v-model="email" 
                                    v-validate="'required|email'"
                                >
                            </div>
                            <span 
                                v-show="errors.has('email')" 
                                class="help is-danger"
                            >
                                {{ errors.first('email') }}
                            </span>
						</div>
					</div>

					<div class="form-group">
						<label for="password" class="cols-sm-2 control-label">Password</label>
						<div class="cols-sm-10">
							<div class="input-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
								<input 
                                    type="password" 
                                    :class="{ 'form-control': true, 'is-danger': errors.has('password') }" 
                                    name="password" 
                                    placeholder="Enter a password" 
                                    v-model="password" 
                                    v-validate="'required|min:6'"
                                    ref="password"
                                >
							</div>
                            <span 
                                v-show="errors.has('password')" 
                                class="help is-danger"
                            >
                                {{ errors.first('password') }}
                            </span>
						</div>
					</div>

					<div class="form-group">
						<label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
						<div class="cols-sm-10">
							<div class="input-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
								<input 
                                    v-validate="'required|confirmed:password'" 
                                    name="password_confirmation" 
                                    type="password" 
                                    :class="{ 'form-control': true, 'is-danger': errors.has('password') }" 
                                    placeholder="Re-enter password" 
                                    data-vv-as="password"
                                >
                            </div>
                            <span 
                                v-show="errors.has('password_confirmation')" 
                                class="help is-danger"
                            >
                                {{ errors.first('password_confirmation') }}
                            </span>
						</div>
					</div>

                    <h2 :style="color">{{message}}</h2>

					<div class="form-group ">
						<button id="button" v-show="!errors.any() && nonemptyName && nonemptyEmail && nonemptyPassword" class="btn btn-primary btn-lg btn-block login-button">Create Account</button>
					</div>	
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Registration',
    props: {
        msg: String
    },
    data() {
        return {
            email: '',
            password: '',
            name: '',
            nonemptyEmail: false,
            nonemptyPassword: false,
            nonemptyName: false
        }
    },
    computed: {
        ...mapState('RegistrationModule', ['loading', 'message', 'color']),
    },
    methods:{
        createAccount(){
            this.$store.dispatch('RegistrationModule/userSignUp', {
                name: this.name,
                email: this.email,
                password: this.password
            })
        }
    },
    watch:{
        email(val){
            this.nonemptyEmail = (val.length > 0)
        },
        password(val){
            this.nonemptyPassword = (val.length > 0)
        },
        name(val){
            this.nonemptyName = (val.length > 0)
        }
    }
}
</script>

<style scoped>
#playground-container {
    height: 500px;
    overflow: hidden !important;
    -webkit-overflow-scrolling: touch;
}
body, html{
    height: 100%;
    background-repeat: no-repeat;
    font-family: 'Oxygen', sans-serif;
	background-size: cover;
}

.main{
    margin:50px 15px;
}

h5, h2 { 
	font-family: 'Passion One', sans-serif; 
	font-weight: 400;
}

h5 { 
	font-size: 30px;
    color: #033ead;
}

h2 { 
	font-size: 15px;
}

hr{
	width: 10%;
	color: #fff;
}

.form-group{
	margin-bottom: 15px;
}

label{
	margin-bottom: 15px;
}

input,
input::-webkit-input-placeholder {
    font-size: 11px;
    padding-top: 3px;
}

.main-login{
    background-color: #fff;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

}
.form-control {
    height: auto !important;
    padding: 8px 12px !important;
}
.input-group {
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
    -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
}
#button {
    border: 1px solid #ccc;
    margin-top: 28px;
    padding: 6px 12px;
    color: #fff;
    text-shadow: 0 1px #fff;
    cursor: pointer;
    -moz-border-radius: 3px 3px;
    -webkit-border-radius: 3px 3px;
    border-radius: 3px 3px;
    -moz-box-shadow: 0 1px #fff inset, 0 1px #ddd;
    -webkit-box-shadow: 0 1px #fff inset, 0 1px #ddd;
    box-shadow: 0 1px #fff inset, 0 1px #ddd;
    background: #028DBD;
    background: -moz-linear-gradient(top, #028DBD 0%, #0281AD 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #028DBD), color-stop(100%, #0281AD));
    background: -webkit-linear-gradient(top, #028DBD 0%, #0281AD 100%);
    background: -o-linear-gradient(top, #028DBD 0%, #0281AD 100%);
    background: -ms-linear-gradient(top, #028DBD 0%, #0281AD 100%);
    background: linear-gradient(top, #028DBD 0%, #0281AD 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#028DBD', endColorstr='#0281AD', GradientType=0);
}
.main-center{
    margin-top: 30px;
    margin: 0 auto;
    max-width: 400px;
    padding: 10px 40px;
	background:rgb(19, 189, 134);
	color: #FFF;
    text-shadow: none;
	-webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
    -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
}
span.input-group-addon i {
    color: #009edf;
    font-size: 17px;
}

.login-button{
	margin-top: 5px;
}

.login-register{
	font-size: 11px;
	text-align: center;
    color: green;
}
.is-danger{
    color: red;
    font-weight: 700;
}
.help {
    background: white;
}

/*Loader*/
.loader {
    margin: auto;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}
@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>
