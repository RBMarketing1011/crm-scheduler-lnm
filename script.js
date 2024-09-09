const sgBtn = document.querySelectorAll('.shopgenie-book-appt-btn')

sgBtn.forEach(btn =>
{
  btn.setAttribute('data-shop', 'craftsman-auto-care-alexandri-1698110590')
})



if (window.location.pathname === '/locations/alexandria/')
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', 'craftsman-auto-care-alexandri-1698110590')
  })
} else if (window.location.pathname === '/locations/ashburn/')
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', 'craftsman-auto-care-ashburn-1698133113')
  })
} else if (window.location.pathname === '/locations/chantilly/')
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', 'craftsman-auto-care-chantilly-1698114195')
  })
} else if (window.location.pathname === '/locations/fairfax/')
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', '')
  })
} else if (window.location.pathname === '/locations/mclean/')
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', 'craftsman-auto-care-mclean-1698110307')
  })
} else if (window.location.pathname === '/locations/merrifield/')
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', 'craftsman-auto-care-1698133214')
  })
} else if (window.location.pathname === '/locations/sterling-cascades/')
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', '')
  })
} else
{
  sgBtn.forEach(btn =>
  {
    btn.setAttribute('data-shop-location', '')
  })
}