

const CarMakes = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="carMakes">Make:</label>
      <select
        id="carMakes"
        defaultValue='blank'
        onChange={ onChange }
      >
        <option value="blank" disabled></option>
        <option value="Acura">Acura</option>
        <option value="Alfa Romeo">Alfa Romeo</option>
        <option value="Audi">Audi</option>
        <option value="BMW">BMW</option>
        <option value="Buick">Buick</option>
        <option value="Cadillac">Cadillac</option>
        <option value="Chevrolet">Chevrolet</option>
        <option value="Chrysler">Chrysler</option>
        <option value="Dodge">Dodge</option>
        <option value="Fiat">Fiat</option>
        <option value="Ford">Ford</option>
        <option value="GMC">GMC</option>
        <option value="Honda">Honda</option>
        <option value="Hyundai">Hyundai</option>
        <option value="Infiniti">Infiniti</option>
        <option value="Jaguar">Jaguar</option>
        <option value="Jeep">Jeep</option>
        <option value="Kia">Kia</option>
        <option value="Land Rover">Land Rover</option>
        <option value="Lexus">Lexus</option>
        <option value="Lincoln">Lincoln</option>
        <option value="Mazda">Mazda</option>
        <option value="Mercedes-Benz">Mercedes-Benz</option>
        <option value="Mini">Mini</option>
        <option value="Mitsubishi">Mitsubishi</option>
        <option value="Nissan">Nissan</option>
        <option value="Porsche">Porsche</option>
        <option value="Subaru">Subaru</option>
        <option value="Tesla">Tesla</option>
        <option value="Toyota">Toyota</option>
        <option value="Volkswagen">Volkswagen</option>
        <option value="Volvo">Volvo</option>
      </select>
    </div>
  )
}

export default CarMakes