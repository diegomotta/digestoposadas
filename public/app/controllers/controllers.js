angular.module('digestoPosadas')
  .controller('homeController', [ '$scope','$state',function ($scope,$state) {
  		//$state.go('index');
  		data= [
			{"name":"I - Administrativo","id":1},
			{"name":"II - Comercio y Promoción Industrial","id":2},
			{"name":"III - Cultura y Educación","id":3},
			{"name":"IV - Deporte, Recreación y Turismo","id":4},
			{"name":"V - Financiero","id":5},
			{"name":"VI - Medio Ambiente y Recursos Naturales","id":6},
			{"name":"VII - Medios de Comunicación Social","id":7},
			{"name":"VIII - MERCOSUR e Integración Regional", "id":8},
			{"name":"IX - Particulares", "id":9},
			{"name":"X - Policía Municipal", "id":10},
			{"name":"XI - Público Municipal", "id":11},
			{"name":"XII - Salud y Calidad de Vida", "id":12},
			{"name":"XIII - Servicios Públicos", "id":13},
			{"name":"XIV - Tierras Fiscales", "id":14},
			{"name":"XV - Trabajo, Seguridad Social y Régimen Previsional", "id":15},
			{"name":"XVI - Transporte y Tránsito", "id":16},
			{"name":"XVII - Vivienda, Planificación Urbana y Obras Públicas", "id":17},
			{"name":"Normas No Consolidadas","id":18},
			{"name":"Normas Refundidas","id":19}
		];
		$scope.branchs= (data);

  }]);

