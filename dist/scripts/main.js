angular.module("Hipopocket",["ngRoute","ngResource","angularMoment","angular-loading-bar"]).config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider,$locationProvider,$httpProvider){$httpProvider.defaults.withCredentials=!0,$routeProvider.when("/:tipo",{templateUrl:"views/index.html",controller:"IndexController"}).when("/:tipo/page/:page",{templateUrl:"views/index.html",controller:"IndexController"}).when("/app/publique",{templateUrl:"views/publique.html",controller:"PubliqueController",requireLogin:!0}).otherwise({redirectTo:function(){return"/destaques"}})}]).run(["$rootScope","$route","$location","amMoment",function($rootScope,$route,$location,amMoment){amMoment.changeLocale("pt-br"),$rootScope.userAuthenticated=null,$rootScope.userState="authenticating",$rootScope.isLogged=function(){return"logged"===$rootScope.userState?!0:(function($){$(".hipopocket-login").modal()}(jQuery),!1)},$rootScope.$on("$locationChangeStart",function(event){var r=$route.routes[$location.path()];r&&r.requireLogin&&!$rootScope.isLogged()&&event.preventDefault()})}]),PromocaoFactory=function($resource,BaseUrl){return $resource(BaseUrl+"/deals/:id",null,{hot:{method:"GET",params:{page:"1"},url:BaseUrl+"/deals/hot/page/:page",isArray:!0},"new":{method:"GET",params:{page:"1"},url:BaseUrl+"/deals/new/page/:page",isArray:!0},favorite:{method:"GET",params:{page:"1"},url:BaseUrl+"/deals/favorite/page/:page",isArray:!0},query:{method:"GET",params:{page:"1",type:"hot"},url:BaseUrl+"/deals/:type/search/:search/page/:page",isArray:!0},update:{method:"PUT",params:{id:"@id"}},count:{method:"GET",params:{type:"hot"},url:BaseUrl+"/deals/:type/count/search/:search"}})},angular.module("Hipopocket").factory("Promocao",PromocaoFactory),VotoFactory=function($resource,BaseUrl){return $resource(BaseUrl+"/votes/:voto_promo_id",null,{update:{method:"PUT"}})},angular.module("Hipopocket").factory("Voto",VotoFactory),UsuarioFactory=function($resource,BaseUrl){return $resource(BaseUrl+"/users/:id",null,{me:{method:"GET",url:BaseUrl+"/users/me"},logout:{method:"GET",url:BaseUrl+"/logout"}})},angular.module("Hipopocket").factory("Usuario",UsuarioFactory),FavoritoFactory=function($resource,BaseUrl){return $resource(BaseUrl+"/favorites/:fav_promo_id",null,{update:{method:"PUT",params:{fav_promo_id:"@fav_promo_id"}}})},angular.module("Hipopocket").factory("Favorito",FavoritoFactory);var IndexController=function($scope,$rootScope,$routeParams,$location,Promocao){switch($routeParams.tipo){case"destaques":$scope.tipo="hot";break;case"novos":$scope.tipo="new";break;case"favoritos":$scope.tipo="favorite";break;default:$scope.tipo="hot"}$scope.page=parseInt($routeParams.page||1),$scope.setPage=function(page){$location.url("/"+$routeParams.tipo+"/page/"+page)},$rootScope.$watch("query",function(){$rootScope.query?Promocao.query({search:$rootScope.query,type:$scope.tipo,page:$scope.page},function(res){$scope.promocoes=res,Promocao.count({search:$rootScope.query,type:$scope.tipo},function(res){$scope.pagesQuantity=res[0]})}):Promocao[$scope.tipo]({page:$scope.page},function(res){$scope.promocoes=res,Promocao.count({type:$scope.tipo},function(res){$scope.pagesQuantity=res[0]})})})};IndexController.$inject=["$scope","$rootScope","$routeParams","$location","Promocao"],angular.module("Hipopocket").controller("IndexController",IndexController);var PubliqueController=function($scope,$rootScope,$routeParams,$location,Promocao){$scope.promo={},$routeParams.id&&Promocao.get({id:$routeParams.id},function(p){$rootScope.userAuthenticated.usuario_id!==p.promo_usuario_id&&history.back(),$scope.promo=p}),$scope.cadastrar=function(){$scope.promo.promo_id?Promocao.update({id:$scope.promo.promo_id},{promo_descr:$scope.promo.promo_descr,promo_url:$scope.promo.promo_url},function(){$scope.status="success",$scope.mensagem="Promoção atualizada com sucesso"},function(res){$scope.status="error",$scope.mensagem=res.msg}):Promocao.save(null,{promo_descr:$scope.promo.promo_descr,promo_url:$scope.promo.promo_url},function(res){$scope.promo.promo_id=res.returning_id,$scope.status="success",$scope.mensagem="Nova promoção publicada com sucesso"},function(res){$scope.status="error",$scope.mensagem=res.msg})},$scope["delete"]=function(){Promocao["delete"]({id:$scope.promo.promo_id},function(){$location.path("/")},function(res){$scope.status="error",$scope.mensagem=res.msg})}};PubliqueController.$inject=["$scope","$rootScope","$routeParams","$location","Promocao"],angular.module("Hipopocket").controller("PubliqueController",PubliqueController);var PromocaoController=function($scope,$rootScope,$routeParams){switch($routeParams.tipo){case"destaques":$scope.tipo="hot";break;case"novos":$scope.tipo="new";break;case"favoritos":$scope.tipo="favorite";break;default:$scope.tipo="hot"}};PromocaoController.$inject=["$scope","$rootScope","$routeParams","Promocao"],angular.module("Hipopocket").controller("PromocaoController",PromocaoController);var VotoController=function($scope,$rootScope,Voto){$scope.upvote=function(){Votar("U")},$scope.downvote=function(){Votar("D")};var Votar=function(tipo){if($rootScope.isLogged()){var promo=$scope.promocao,oldvoto=promo.voto_tipo,possuiVoto=Boolean(promo.voto_tipo);possuiVoto?tipo!==promo.voto_tipo?(Voto.update({voto_promo_id:promo.promo_id},{voto_tipo:tipo}),promo.voto_tipo=tipo,promo["U"===tipo?"promo_upvotes":"promo_downvotes"]++,promo["U"===oldvoto?"promo_upvotes":"promo_downvotes"]--):(delete promo.voto_tipo,Voto["delete"]({voto_promo_id:promo.promo_id}),promo["U"===tipo?"promo_upvotes":"promo_downvotes"]--):(Voto.save(null,{voto_promo_id:promo.promo_id,voto_tipo:tipo}),promo.voto_tipo=tipo,promo["U"===tipo?"promo_upvotes":"promo_downvotes"]++),promo.promo_votos=promo.promo_upvotes-promo.promo_downvotes}}};VotoController.$inject=["$scope","$rootScope","Voto"],angular.module("Hipopocket").controller("VotoController",VotoController);var NavbarController=function($scope,$rootScope,$window,Usuario,BaseUrl){Usuario.me(function(data){$rootScope.userAuthenticated=data,$rootScope.userState="logged"},function(){$rootScope.userAuthenticated=null,$rootScope.userState="unauthorized"}),$scope.login=function(provider){$window.location.href=BaseUrl+"/auth/"+provider},$scope.logout=function(){Usuario.logout(function(){$window.location.reload()})}};NavbarController.$inject=["$scope","$rootScope","$window","Usuario","BaseUrl"],angular.module("Hipopocket").controller("NavbarController",NavbarController);var FavoritoController=function($scope,$rootScope,Favorito){$scope.favorite=function(){Favoritar()};var Favoritar=function(){if($rootScope.isLogged()){var promo=$scope.promocao,possuiFavorito=Boolean(promo.fav_promo_id);possuiFavorito?(promo.fav_promo_id=null,Favorito["delete"]({fav_promo_id:promo.promo_id})):(Favorito.save(null,{fav_promo_id:promo.promo_id}),promo.fav_promo_id=promo.promo_id)}}};FavoritoController.$inject=["$scope","$rootScope","Favorito"],angular.module("Hipopocket").controller("FavoritoController",FavoritoController),angular.module("Hipopocket").directive("promocao",function(){return{restrict:"E",templateUrl:"views/promocao.html",scope:{data:"=data"},controller:"PromocaoController"}}),angular.module("Hipopocket").directive("voto",function(){return{restrict:"E",templateUrl:"views/voto.html",scope:{promocao:"=promocao"},controller:"VotoController"}}),angular.module("Hipopocket").directive("navbar",function(){return{restrict:"E",templateUrl:"views/navbar.html",controller:"NavbarController"}}),angular.module("Hipopocket").directive("favorito",function(){return{restrict:"E",templateUrl:"views/favorito.html",scope:{promocao:"=promocao"},controller:"FavoritoController"}});