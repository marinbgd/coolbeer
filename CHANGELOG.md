# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## 2017-06-19 -- version 0.1.0
- Project setup
- Setting the global style (.editorconfig) to use tabs with 4 spaces and reformatting code
- Added versioning.txt and CHANGELOG.md to track changes and versions appropriately
- Added container components - Header, SideMenu and MainWrapper
- Added Material-UI -> material design components for React (material-ui.com)
- Added Roboto font
- Added new material header (AppBar)
- Added lodash lib
- Added typography
- Added SideDropDown component (used in SideMenu)
- Added PURE css framework into header via CDN
- Added chart.js lib for chart components
- Added PieChart, BarChart, LineChart, PolarAreaChart and DoughnutChart dumb components/wrappers around chart.js
- Added config.js with API_URL constant
- Added isomorphic-fetch and es6-promise libs for handling async network requests
- Integrated SERVER API PHP code into the project (folder 'server')
- Integrated SideMenu drop downs with data from the API 
- Added DateHelper
- Added DatePickers to the HomePage and integrated with the reducers
- Added API /home endpoint that receives startDate and endDate for data filtering 
- Integrated DatePicker with data fetching
- Added progress loaders on side menu drop downs loading
- Added Google material icons
- Added progress loader for home page table and no data info and icon
- Added error handling for side menu and home page fetching
- Integrated SideMenu drop downs and search box term with getData function
- Removed title "CoolBeer" from Home page
- Added moment.js lib for handling/formatting dates
- Refactored DB table names - singularity; Added cityId to "podaci" to relate to city table;
- Added "shops.php" "endpoint" for getting the shops data and added city, region and country properties; Filtering by cityId is added too
- Improved HomePage table - displaying more data; fixed style glitches; added multiple selections; added scrollbars if needed


## 2017-07-09 -- version 0.2.0
- Changed HomePage table to be just a list of unique shops matching filters on UI
- Added new API endpoint - shopDetails
- Added ShopsDetailsTable and fetching of selected shops details (avg/min/max temperature)
- Integrated searchBox with the API - now search term is applied to filtering data (search term is used in 'sn' column)
- Removed fuel calc demo
- Added Demo page with charts
- Refactored HomePage to use bindActionCreators redux method
- Removed trackJs unused code from index.ejs and webpack.config.prod
- Added google-maps-react dependency
- Added CbMap component to show selected shops locations
- Changed ShopsDetailsTable component to show CO2a max and min instead redundant city, region and country
- Added ShopsLineChart for showing selected shops data - currently only line1
- Improved shopDetails API method to extract daily data for each device - SN
- Fixed API shopDetails to shop proper day - hourly data
- Fixed ShopsLineChart to show labels properly
- Adjusted ShopsLineChart to show new data according to shopDetails API changes


## TODO
- Figure appropriate LICENSE and change it
