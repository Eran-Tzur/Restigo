//  add item form --------
$('#item-add-form').on('submit', function (event) {
  $(this).find('p').text('');

  let catalogRegExp = /^[0-9]*$/,
    priceRegExp = /^[0-9]{1,15}([,.][0-9]{1,2})?$/;
  let diversities = [];
  $name = $('#name'),
    $price = $('#price'),
    $catalog_number = $('#catalog_number'),
    $enable = $("input[type='radio'][name='enable']:checked"),
    $has_vat = $("input[type='radio'][name='has_vat']:checked"),
    diversitiesCheckboxes = $("input:checkbox[name=diversity_enabled]:checked").each(function () {
      diversities.push($(this).val());
    });
  itemData = {
    name: $name.val().trim(),
    price: $price.val().trim(),
    catalog_number: $catalog_number.val().trim(),
    enable: $enable.val().trim(),
    has_vat: $has_vat.val().trim(),
    diversities
  },
    isValid = true;

  checkName(itemData.name);
  checkCatalogNumber(itemData.catalog_number, catalogRegExp);
  checkPrice(itemData.price, priceRegExp);
  if (isValid) {
    ajaxAddItem(itemData)
  }
  diversities = [];
  event.preventDefault();
});
//  end add item form ------
//  edit item form ------
$('#item-edit-form').on('submit', function (event) {
  $(this).find('p').text('');

  let catalogRegExp = /^[0-9]*$/,
    priceRegExp = /^[0-9]{1,15}([,.][0-9]{1,2})?$/;
  let diversities = [];
  $name = $('#edit_name'),
    $price = $('#edit_price'),
    $catalog_number = $('#edit_catalog_number'),
    $enable = $("input[type='radio'][name='edit_enable']:checked"),
    $has_vat = $("input[type='radio'][name='edit_has_vat']:checked"),
    diversitiesCheckboxes = $("input:checkbox[name=diversity_enabled]:checked").each(function () {
      diversities.push($(this).val());
    });
  itemData = {
    id: $(this).attr("name"),
    name: $name.val().trim(),
    price: $price.val().trim(),
    catalog_number: $catalog_number.val().trim(),
    enable: $enable.val().trim(),
    has_vat: $has_vat.val().trim(),
    diversities
  },
    isValid = true;

  checkName(itemData.name);
  checkCatalogNumber(itemData.catalog_number, catalogRegExp);
  checkPrice(itemData.price, priceRegExp);

  if (isValid) {
    ajaxEditItem(itemData)
  }
  event.preventDefault();
});
//  end edit item form ------
//  add client form --------
$('#client-add-form').on('submit', function (event) {
  $(this).find('p').text('');

  let diversities = [];
  $name = $('#name'),
    $type = $("input[type='radio'][name='type']:checked"),
    $enable = $("input[type='radio'][name='enable']:checked"),
    diversitiesCheckboxes = $("input:checkbox[name=diversity_enabled]:checked").each(function () {
      diversities.push($(this).val());
    });
  clientData = {
    name: $name.val().trim(),
    type: $type.val().trim(),
    enable: $enable.val().trim(),
    diversities
  },
    isValid = true;

  checkName(clientData.name);

  if (isValid) {
    ajaxAddClient(clientData)
  }
  event.preventDefault();
});
//  end add client form --------
//  edit client form --------
$('#client-edit-form').on('submit', function (event) {
  $(this).find('p').text('');

  let diversities = [];
  $name = $('#edit_name'),
    $type = $("input[type='radio'][name='edit_type']:checked"),
    $enable = $("input[type='radio'][name='edit_enable']:checked"),
    diversitiesCheckboxes = $("input:checkbox[name=diversity_enabled]:checked").each(function () {
      diversities.push($(this).val());
    });
  clientData = {
    id: $(this).attr("name"),
    name: $name.val().trim(),
    type: $type.val().trim(),
    enable: $enable.val().trim(),
    diversities
  },
    isValid = true;

  checkName(clientData.name);

  if (isValid) {
    ajaxEditClient(clientData)
  }
  event.preventDefault();
});
//  end edit client form --------
//  add diversity form ---------
$('#diversity-add-form').on('submit', function (event) {
  $(this).find('p').text('');

  $name = $('#name'),
    $enable = $("input[type='radio'][name='enable']:checked"),
    diversityData = {
      id: $(this).attr("name"),
      name: $name.val().trim(),
      enable: $enable.val().trim()
    },
    isValid = true;

  checkName(diversityData.name);

  if (isValid) {
    ajaxAddDiversity(diversityData)
  }
  event.preventDefault();
});
//  end add diversity form -----
//  edit diversity form ---------
$('#diversity-edit-form').on('submit', function (event) {
  $(this).find('p').text('');

  $name = $('#edit_name'),
    $enable = $("input[type='radio'][name='edit_enable']:checked"),
    diversityData = {
      id: $(this).attr("name"),
      name: $name.val().trim(),
      enable: $enable.val().trim()
    },
    isValid = true;

  checkName(diversityData.name);

  if (isValid) {
    ajaxEditDiversity(diversityData)
  }
  event.preventDefault();
});
//  end edit diversity form -----

function checkName(name) {
  if (name.length < 2 || name.length > 50) {
    $name.next().text(' * A valid Name is required minimum 2 characters');
    return isValid = false;
  }
}

function checkCatalogNumber(catalog, regExp) {
  if (!regExp.test(catalog) || catalog.length < 1) {
    $catalog_number.next().text(' * A valid Catalog number is required');
    isValid = false;
  }
}

function checkPrice(price, regExp) {
  if (!regExp.test(price) || price.length < 1) {
    $price.next().text(' * A valid Price is required');
    isValid = false;
  }
}
function ajaxAddItem(itemData) {
  $.ajax({
    url: 'http://localhost/restigo_mission_eran_laravel/public/add-item',
    type: 'POST',
    dataType: 'JSON',
    data: itemData,
    success: function (data) {
      alert('item has been saved')
      location.reload();
    },
    error: function (data) {
      alert('something went wrong');
    }
  });
}

function ajaxEditItem(itemData) {
  $.ajax({
    url: 'http://localhost/restigo_mission_eran_laravel/public/edit-item',
    type: 'POST',
    dataType: 'JSON',
    data: itemData,
    success: function (data) {
      alert('item has been saved')
      location.reload();
    },
    error: function (data) {
      alert('something went wrong');
    }
  });
}

function ajaxAddClient(clientData) {
  $.ajax({
    url: 'http://localhost/restigo_mission_eran_laravel/public/add-client',
    type: 'POST',
    dataType: 'JSON',
    data: clientData,
    success: function (data) {
      alert('item has been saved')
      location.reload();
    },
    error: function (data) {
      alert('something went wrong');
    }
  });
}

function ajaxEditClient(clientData) {
  $.ajax({
    url: 'http://localhost/restigo_mission_eran_laravel/public/edit-client',
    type: 'POST',
    dataType: 'JSON',
    data: clientData,
    success: function (data) {
      alert('item has been saved')
      location.reload();
    },
    error: function (data) {
      alert('something went wrong');
    }
  });
}

function ajaxAddDiversity(diversityData) {
  $.ajax({
    url: 'http://localhost/restigo_mission_eran_laravel/public/add-diversity',
    type: 'POST',
    dataType: 'JSON',
    data: diversityData,
    success: function (data) {
      alert('item has been saved')
      location.reload();
    },
    error: function (data) {
      alert('something went wrong');
    }
  });
}

function ajaxEditDiversity(diversityData) {
  $.ajax({
    url: 'http://localhost/restigo_mission_eran_laravel/public/edit-diversity',
    type: 'POST',
    dataType: 'JSON',
    data: diversityData,
    success: function (data) {
      alert('item has been saved')
      location.reload();
    },
    error: function (data) {
      alert('something went wrong');
    }
  });
}