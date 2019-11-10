<template>
    <v-container>
        <div id="handler_bar">
        <v-btn color="primary">
            <v-icon>mdi-plus</v-icon>
            <span>Thêm mới bộ phận</span>
        </v-btn>
        <div style="float: right;">
            <v-text-field id="search_input" single-line outlined append-icon="mdi-magnify" placeholder="Nhập để tìm kiếm" />
            <v-select label="Lựa chọn điều kiện lọc" v-bind:items="filter" style="float: left">
                
            </v-select>
            <v-btn style="margin-top:10px; margein-left:5px;" type="button" color="primary" id="sidebarCollapse" class="btn btn-info navbar-btn">
                <v-icon>mdi-magnify</v-icon>
                <span>Tìm kiếm</span>
            </v-btn>
        </div>
    </div>
    <br>
    <div class="tab">
        <v-btn class="tablinks" v-on:click="openCity(event, 'departmentLevel')">Cấp bậc bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'departmentUser')">Cơ cấu bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'position')">Chức danh</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'kpiEquation')">Lưới tiêu chí KPI</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'log')">Nhật ký hoạt động</v-btn>
    </div> 
    <div id="tabController">   
        <div id="departmentLevel" class="tabcontent">1</div>
        <div id="departmentUser" class="tabcontent">2</div>
        <div id="position" class="tabcontent">3</div>
        <div id="kpiEquation" class="tabcontent">4</div>
        <div id="log" class="tabcontent">5</div>
    </div>
    </v-container>
</template>


<style>
    .tab {
        width: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
    }

        /* Style the buttons that are used to open the tab content */
        .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
        }

            /* Change background color of buttons on hover */
            .tab button:hover {
                background-color: #ddd;
            }

            /* Create an active/current tablink class */
            .tab button.active {
                background-color: #ccc;
            }

    /* Style the tab content */
    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-top: none;
    }
</style>

<script>
export default {
  name: "Tab",
  data() {
    return {
      datas: [],
      filter: [
        "Tên bộ phận",
        "Cấp bộ phận",
      ],
    };
  },
  methods:{
      openCity(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
  }
};
</script>