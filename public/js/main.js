$(document).ready(() => {
  $('.delete-todo').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/todo/delete/' + id,
      success: (response) => {
        //alert('Deleting Todo');
        //console.log(response);
        $("#getCode").html(response);
        $("#getCodeModal").modal('show');
        //window.location.href = '/';
      },
      error: (error) => {
        console.log(err);
      }
    });
  });
  $('#getCodeModal').on('hidden.bs.modal', function (e) {
    window.location.href = '/';
})
});
