define(['jquery','backbone'],
	function($,Backbone) {
		
		var Model = Backbone.Model.extend({

			defaults: {
                    // props: {
                    //     name: "Venkat",
                    //     mobile: [
                    //         "+91 - 9500600704",
                    //          "044 - 13342356"
                    //     ],
                    //     email: [
                    //         "venkat.crescentian@gmail.com"
                    //     ],
                    //     oldprice: 320,
                    //     newprice: 110,
                    //     contacts: [
                    //         "Venkat",
                    //         "Subrmanian"
                    //     ],
                    //     status: "new"

                    // }
			},
			initialize: function() {

			}
		});
		

		return Model;
});