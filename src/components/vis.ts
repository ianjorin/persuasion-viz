import embed from 'vega-embed';

const espec1 = ({
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"data": {"url": "https://docs.google.com/spreadsheets/d/1CDDmzmPywWEpv8xMB9Mip9R_aaONJDpujxQe_knc6WI/gviz/tq?tqx=out:csv"},
	"width":400,
	"height":400,
	// "data": {
	//   "values": explosions_data_typed
	// },
	"mark": "arc",
	"encoding": {
	  "theta": {"field": "type","type":"nominal","aggregate":"count"},
	  "color": {"field": "type","title":"Explosion Type"}
	}
});

const espec2 = ({
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"data": {"url": "../../data/explosions.csv"},
	"mark": "bar",
	"encoding":{
	  "x":{"field":"year","type":"ordinal","title":"Year"},
	  "y":{"aggregate":"count","title":"Number of Explosions"},
	  "color":{"field":"country","type":"nominal","title":"Country"},
	  "tooltip": [
		{"field": "count", "title": "Number of explosions","aggregate":"count"},
		{"field": "country"}
	  ]
	},
	"title":"Explosions Count by Country and Year"
	
  })

  const espec3 = ({
	"$schema":"https://vega.github.io/schema/vega-lite/v5.json",
	"width":"600",
	"height":"400",
	"data": {"url": "../../data/explosions.csv"},
	"mark": {"type":"area","interpolate":"monotone"},
	"transform":[{"calculate":"toDate(datum.year + '-01-01')","as":"year_date"}],
	"encoding":{
	  "x":{"timeUnit":"year","field":"year_date","title":"Year"},
	  "y":{"aggregate":"count","title":"Number of Explosions"},
	  "color":{"field":"purpose","type":"nominal","title":"Purpose"},
	  "tooltip": [
		{"field": "year_date", "title": "Year","timeUnit":"year"},
		{"field": "count","title":"Number of Explosions","aggregate":"count"}
	  ]
	},
	"title":"Explosions by Year and Purpose"
	
  });


  const slidingWindow = ({
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"description": "Interactive chart with a time frame selector.",
	"title": "Nuclear Explosions Over Years", 
	"data": {"url": "../../data/explosions.csv"},
	"transform": [
	  {
		"aggregate": [{"op": "count", "as": "explosions"}],
		"groupby": ["year"]
	  }
	],
	"vconcat": [
	  {
		"width": 800,
		"height": 300,
		"mark": "line",
		"encoding": {
		  "x": {
			"field": "year",
			"type": "quantitative",
			"scale": {"domain": {"selection": "brush"}},
			"axis": {
			  "format": "d", 
			  "labelAngle": -45,
			  "title": "Year"
			}
		  },
		  "y": {
			"field": "explosions",
			"type": "quantitative",
			"axis": {"title": "Number of Explosions"}
		  },
		  "tooltip": [
			{"field": "year", "type": "quantitative", "title": "Year"},
			{"field": "explosions", "type": "quantitative", "title": "Explosions"}
		  ]
		}
	  },
	  {
		"width": 800,
		"height": 60,
		"mark": "area",
		"selection": {
		  "brush": {"type": "interval", "encodings": ["x"]}
		},
		"encoding": {
		  "x": {
			"field": "year",
			"type": "quantitative",
			"axis": {
			  "format": "d", 
			  "title": "Year Selector",
			  "labelAngle": -45
			}
		  },
		  "y": {
			"field": "explosions",
			"type": "quantitative",
			"axis": {"tickCount": 3, "grid": false}
		  }
		}
	  }
	]
  })

  const worldMap = ({
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"description": "Map of nuclear explosions plotted by longitude and latitude, with detailed tooltips",
	"title": "Global Nuclear Explosions", 
	"layer": [
	  {
		"data": {
		  "url": "https://vega.github.io/vega-datasets/data/world-110m.json",
		  "format": {
			"type": "topojson",
			"feature": "countries"
		  }
		},
		"projection": {
		  "type": "naturalEarth1"
		},
		"mark": {
		  "type": "geoshape",
		  "fill": "lightgray",
		  "stroke": "white"
		}
	  },
	  {
		"data": {"url": "../../data/explosions.csv"},
		"mark": {
		  "type": "circle",
		  "size": 200, 
		  "color": "firebrick"
		},
		"encoding": {
		  "longitude": {
			"field": "longitude",
			"type": "quantitative"
		  },
		  "latitude": {
			"field": "latitude",
			"type": "quantitative"
		  },
		  "tooltip": [
			{"field": "country", "type": "nominal", "title": "Country"},
			{"field": "year", "type": "ordinal", "title": "Year"},
			{"field": "magnitude_body", "type": "quantitative", "title": "Magnitude Body"},
			{"field": "purpose", "type": "nominal", "title": "Purpose"}
		  ]
		}
	  }
	],
	"width": 1000, 
	"height": 600, 
	"config": {
	  "view": {
		"stroke": "transparent" 
	  }
	}
  })

  embed("#evis1",espec1)

  embed("#evis2",espec2)

  embed("#evis3",espec3)

  embed("#rvis1",slidingWindow)

  embed("#rvis2",worldMap)