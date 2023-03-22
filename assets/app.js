/***********/
// Vue app //
/***********/



// Start Vue instance
var explorer = new Vue({
    el: "#explorer",
    data: {
        categories: cats,
        tabIndex: 0,
        measure_data: {},
        measures_loaded: false,
        cohort: "mcc",
        fields_to_display: [
            "short_name",
            "long_name",
            "measure_category",
            "measure_type",
            "respondents",
            "ecc",
            "mcc",
        ],
        all_categories: categories_list,
        filter_categories: [],
        filter_types: [],
        search_text: "",
    },
    computed: {
        all_short_names: function () {
            name_list = this.measure_data.map(function(measure) {
                return measure["short_name"];
            });
            return [...new Set(name_list)]
        },
        all_long_names: function () {
            name_list = this.measure_data.map(function(measure) {
                return measure["long_name"];
            });
            return [...new Set(name_list)]
        },
        all_types: function () {
            types_list = this.measure_data.map(function(measure) {
                return measure["measure_type"];
            });
            return [...new Set(types_list)]
        },
        filtered_measures_search() {
            return this.measure_data.filter((c) => {
              if (this.search_text == "") return true;
              return (
                c.short_name.toLowerCase().indexOf(this.search_text.toLowerCase()) >= 0 ||
                c.long_name.toLowerCase().indexOf(this.search_text.toLowerCase()) >= 0
              );
            });
        },
    },
    methods: {
    },

    beforeMount() {
        // Load new measure data
        measure_data_file = 'inputs/processed_data/measure_data.json'
        fetch(measure_data_file)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(
                    "WARNING: measure_data.json file could not be loaded"
                );
            }
        })
        .then((responseJson) => {
            this.measure_data = responseJson;
            this.measures_loaded = true;
        })
        .catch((error) => {
            console.log(error);
        });      
    },
});