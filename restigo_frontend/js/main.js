$(document).ready(() => {

  getAllItems();
  getAllDiversities();
  getAllClients();

  $('.add-toggle').click(function () {
    $(this).parent().next('.hide').toggle();
    $(this).text($(this).text() == "+" ? "-" : "+");
  })

  $('.list-toggle').click(function () {
    $(this).parent().next('.hide').toggle();
    $(this).text($(this).text() == "+" ? "-" : "+");
  })

  $("table").on("click", ".item-edit", function () {
    const itemId = $(this).attr("id");
    getItemById(itemId);
    $(".popup-overlay").toggle();
    getItemDiversities(itemId);

  });

  $("table").on("click", ".diversity-edit", function () {
    getDiversityById($(this).attr("id"));
    $(".popup-overlay").toggle();
  });

  $("table").on("click", ".client-edit", function () {
    const clientId = $(this).attr("id");
    getClientById(clientId);
    $(".popup-overlay").toggle();
    getClientDiversities(clientId);
  });

  $("#close").click(function () {
    $(".popup-overlay").toggle();
    $("input:checkbox").prop('checked', false)
  })

});

function getAllItems() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost/restigo_mission_eran_laravel/public/items',
    dataType: 'json',
    success: (items) => {

      $(items).each((i, item) => {

        $('#diversiti_items').append($(`<label name=${item.name}>${item.name}</label>`))
        $('#diversiti_items').append($(`<input type="checkbox"name=${item.name} value=${item.name}><br>`))
        $('.item-list').append($('<tr>')
          .append($('<td>').append(item.name))
          .append($('<td>').append(item.catalog_number))
          .append($('<td>').append(item.price))
          .append($('<td>').append(item.enable))
          .append($('<td>').append(item.has_vat))
          .append($('<td>').append(`<button class="item-edit" id=${item.id}>Edit</button>`))
        )
      })
    }
  })
}

function getAllDiversities() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost/restigo_mission_eran_laravel/public/diversities',
    dataType: 'json',
    success: (diversities) => {
      $(diversities).each((i, diversity) => {
        setDiversitiesCheckboxes('#item_diversities', diversity);
        setDiversitiesCheckboxes('#edit_item_diversities', diversity);
        setDiversitiesCheckboxes('#add_diversiti_clients', diversity);
        setDiversitiesCheckboxes('#edit_diversiti_clients', diversity);
        $('.diversities-list').append($('<tr>')
          .append($('<td>').append(diversity.name))
          .append($('<td>').append(diversity.enable))
          .append($('<td>').append('item 1<br>item 2<br>item 3'))
          .append($('<td>').append('Client 1<br>Client 2<br>Client 3'))
          .append($('<td>').append(`<button class="diversity-edit" id=${diversity.id}>Edit</button>`))
        )
      })
    }
  })
}

function getAllClients() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost/restigo_mission_eran_laravel/public/clients',
    dataType: 'json',
    success: (clients) => {
      $(clients).each((i, client) => {
        $('#diversiti_clients').append($(`<label name=${client.name}>${client.name}</label>`))
        $('#diversiti_clients').append($(`<input type="checkbox"name=${client.name} value=${client.name}><br>`))
        $('.clients-lists').append($('<tr>')
          .append($('<td>').append(client.name))
          .append($('<td>').append(getClientsType(client.type)))
          .append($('<td>').append(client.enable))
          .append($('<td>').append(`<button class="client-edit" id=${client.id}>Edit</button>`))
        )
      })
    }
  })
}

function getItemDiversities(itemId) {
  $.ajax({
    type: 'GET',
    url: `http://localhost/restigo_mission_eran_laravel/public/item_diversities/${itemId}`,
    dataType: 'json',
    success: (item_diversities) => {
      $(item_diversities).each((i, item_diversity) => {
        $("#edit_item_diversities").find(`input[type='checkbox'][name="diversity_enabled"][value=${item_diversity.id}]`).prop('checked', true);
      })
    }
  })
}

function getClientDiversities(clientId) {
  $.ajax({
    type: 'GET',
    url: `http://localhost/restigo_mission_eran_laravel/public/client_diversities/${clientId}`,
    dataType: 'json',
    success: (client_diversities) => {
      $(client_diversities).each((i, client_diversity) => {
        $("#edit_diversiti_clients").find(`input[type='checkbox'][name="diversity_enabled"][value=${client_diversity.id}]`).prop('checked', true);
      })
    }
  })
}

function getClientsType(type) {
  switch (type) {
    case 1:
      return "resturant"
    case 2:
      return "coffe house"
    case 3:
      return "bar"
  }
}

function setDiversitiesCheckboxes(divId, diversity) {
  $(divId).append($(`<label name=${diversity.name}>${diversity.name}</label>`))
  $(divId).append($(`<input type="checkbox" name="diversity_enabled" value=${diversity.id}><br>`));
}

function getItemById(id) {
  $.ajax({
    type: 'GET',
    url: `http://localhost/restigo_mission_eran_laravel/public/item/${id}`,
    dataType: 'json',
    success: (item) => {

      $(".popup-overlay").find("#item-edit-form").attr("name", id);
      $(".popup-overlay").find("#edit_name").val(item.name);
      $(".popup-overlay").find("#edit_catalog_number").val(item.catalog_number);
      $(".popup-overlay").find("#edit_price").val(item.price);
      $(".popup-overlay").find(`input[type='radio'][name="edit_enable"][value=${item.enable}]`).prop('checked', true);
      $(".popup-overlay").find(`input[type='radio'][name="edit_has_vat"][value=${item.has_vat}]`).prop('checked', true);
    },
  })
}

function getDiversityById(id) {
  $.ajax({
    type: 'GET',
    url: `http://localhost/restigo_mission_eran_laravel/public/diversity/${id}`,
    dataType: 'json',
    success: (diversity) => {
      $(".popup-overlay").find("#diversity-edit-form").attr("name", id);
      $(".popup-overlay").find("#edit_name").val(diversity.name);
      $(".popup-overlay").find(`input[type='radio'][name="edit_enable"][value=${diversity.enable}]`).prop('checked', true);
    },
  })
}

function getClientById(id) {
  $.ajax({
    type: 'GET',
    url: `http://localhost/restigo_mission_eran_laravel/public/client/${id}`,
    dataType: 'json',
    success: (client) => {
      $(".popup-overlay").find("#client-edit-form").attr("name", id);
      $(".popup-overlay").find("#edit_name").val(client.name);
      $(".popup-overlay").find("#edit_type").val(client.type);
      $(".popup-overlay").find(`input[type='radio'][name="edit_enable"][value=${client.enable}]`).prop('checked', true);
      $(".popup-overlay").find(`input[type='radio'][name="edit_type"][value=${client.type}]`).prop('checked', true);
    },
  })
}