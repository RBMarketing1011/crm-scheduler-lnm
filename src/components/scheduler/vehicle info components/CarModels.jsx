const Blank = () =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="blank">Model:</label>
      <select id="blank">
        <option value=""></option>
      </select>
    </div>
  )
}

const Acura = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="acuraModels">Model:</label>
      <select id="acuraModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="ILX">ILX</option>
        <option value="MDX">MDX</option>
        <option value="NSX">NSX</option>
        <option value="RDX">RDX</option>
        <option value="RL">RL</option>
        <option value="RLX">RLX</option>
        <option value="TL">TL</option>
        <option value="TLX">TLX</option>
        <option value="TSX">TSX</option>
        <option value="ZDX">ZDX</option>
      </select>
    </div>
  )
}

const AlfaRomeo = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="alfaRomeoModels">Model:</label>
      <select id="alfaRomeoModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="4C">4C</option>
        <option value="Giulia">Giulia</option>
        <option value="Stelvio">Stelvio</option>
      </select>
    </div>
  )
}

const Audi = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="audiModels">Model:</label>
      <select id="audiModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="A3">A3</option>
        <option value="A4">A4</option>
        <option value="A5">A5</option>
        <option value="A6">A6</option>
        <option value="A7">A7</option>
        <option value="A8">A8</option>
        <option value="Q3">Q3</option>
        <option value="Q5">Q5</option>
        <option value="Q7">Q7</option>
        <option value="Q8">Q8</option>
        <option value="R8">R8</option>
        <option value="RS3">RS3</option>
        <option value="RS5">RS5</option>
        <option value="RS6">RS6</option>
        <option value="RS7">RS7</option>
        <option value="S3">S3</option>
        <option value="S4">S4</option>
        <option value="S5">S5</option>
        <option value="S6">S6</option>
        <option value="S7">S7</option>
        <option value="S8">S8</option>
        <option value="SQ5">SQ5</option>
        <option value="SQ7">SQ7</option>
        <option value="TT">TT</option>
      </select>
    </div>
  )
}

const Bmw = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="bmwModels">Model:</label>
      <select id="bmwModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="1 Series">1 Series</option>
        <option value="2 Series">2 Series</option>
        <option value="3 Series">3 Series</option>
        <option value="4 Series">4 Series</option>
        <option value="5 Series">5 Series</option>
        <option value="6 Series">6 Series</option>
        <option value="7 Series">7 Series</option>
        <option value="8 Series">8 Series</option>
        <option value="X1">X1</option>
        <option value="X2">X2</option>
        <option value="X3">X3</option>
        <option value="X4">X4</option>
        <option value="X5">X5</option>
        <option value="X6">X6</option>
        <option value="X7">X7</option>
        <option value="Z4">Z4</option>
        <option value="i3">i3</option>
        <option value="i8">i8</option>
        <option value="M2">M2</option>
        <option value="M3">M3</option>
        <option value="M4">M4</option>
        <option value="M5">M5</option>
        <option value="M6">M6</option>
        <option value="X3 M">X3 M</option>
        <option value="X4 M">X4 M</option>
        <option value="X5 M">X5 M</option>
        <option value="X6 M">X6 M</option>
        <option value="Z4 M40i">Z4 M40i</option>
      </select>
    </div>
  )
}

const Buick = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="buickModels">Model:</label>
      <select id="buickModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Enclave">Enclave</option>
        <option value="Encore">Encore</option>
        <option value="Envision">Envision</option>
        <option value="LaCrosse">LaCrosse</option>
        <option value="Regal">Regal</option>
      </select>
    </div>
  )
}

const Cadillac = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="cadillacModels">Model:</label>
      <select id="cadillacModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="CT4">CT4</option>
        <option value="CT5">CT5</option>
        <option value="CT6">CT6</option>
        <option value="Escalade">Escalade</option>
        <option value="XT4">XT4</option>
        <option value="XT5">XT5</option>
        <option value="XT6">XT6</option>
      </select>
    </div>
  )
}

const Chevy = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="chevroletModels">Model:</label>
      <select id="chevroletModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Blazer">Blazer</option>
        <option value="Camaro">Camaro</option>
        <option value="Colorado">Colorado</option>
        <option value="Corvette">Corvette</option>
        <option value="Equinox">Equinox</option>
        <option value="Express">Express</option>
        <option value="Impala">Impala</option>
        <option value="Malibu">Malibu</option>
        <option value="Silverado 1500">Silverado 1500</option>
        <option value="Silverado 2500HD">Silverado 2500HD</option>
        <option value="Silverado 3500HD">Silverado 3500HD</option>
        <option value="Sonic">Sonic</option>
        <option value="Spark">Spark</option>
        <option value="Suburban">Suburban</option>
        <option value="Tahoe">Tahoe</option>
        <option value="Trailblazer">Trailblazer</option>
        <option value="Traverse">Traverse</option>
        <option value="Trax">Trax</option>
      </select>
    </div>
  )
}

const Chrysler = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="chryslerModels">Model:</label>
      <select id="chryslerModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="300">300</option>
        <option value="Pacifica">Pacifica</option>
        <option value="Voyager">Voyager</option>
      </select>
    </div>
  )
}

const Dodge = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="dodgeModels">Model:</label>
      <select id="dodgeModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Avenger">Avenger</option>
        <option value="Caliber">Caliber</option>
        <option value="Caravan">Caravan</option>
        <option value="Challenger">Challenger</option>
        <option value="Charger">Charger</option>
        <option value="Dart">Dart</option>
        <option value="Durango">Durango</option>
        <option value="Grand Caravan">Grand Caravan</option>
        <option value="Journey">Journey</option>
        <option value="Magnum">Magnum</option>
        <option value="Nitro">Nitro</option>
        <option value="Ram 1500">Ram 1500</option>
        <option value="Ram 2500">Ram 2500</option>
        <option value="Ram 3500">Ram 3500</option>
        <option value="Ram Van">Ram Van</option>
        <option value="Ram Wagon">Ram Wagon</option>
        <option value="Sprinter">Sprinter</option>
        <option value="Stratus">Stratus</option>
        <option value="Viper">Viper</option>
      </select>
    </div>
  )
}

const Fiat = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="fiatModels">Model:</label>
      <select id="fiatModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="124 Spider">124 Spider</option>
        <option value="500">500</option>
        <option value="500L">500L</option>
        <option value="500X">500X</option>
        <option value="500e">500e</option>
        <option value="500c">500c</option>
        <option value="500L Living">500L Living</option>
        <option value="Doblo">Doblo</option>
        <option value="Ducato">Ducato</option>
        <option value="Fiorino">Fiorino</option>
        <option value="Fullback">Fullback</option>
        <option value="Panda">Panda</option>
        <option value="Punto">Punto</option>
        <option value="Qubo">Qubo</option>
        <option value="Talento">Talento</option>
        <option value="Tipo">Tipo</option>
        <option value="Tipo Cross">Tipo Cross</option>
        <option value="Tipo Station Wagon">Tipo Station Wagon</option>
      </select>
    </div>
  )
}

const Ford = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="fordModels">Model:</label>
      <select id="fordModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Bronco">Bronco</option>
        <option value="C-Max">C-Max</option>
        <option value="EcoSport">EcoSport</option>
        <option value="Edge">Edge</option>
        <option value="Escape">Escape</option>
        <option value="Expedition">Expedition</option>
        <option value="Explorer">Explorer</option>
        <option value="F-150">F-150</option>
        <option value="F-250">F-250</option>
        <option value="F-350">F-350</option>
        <option value="Fiesta">Fiesta</option>
        <option value="Flex">Flex</option>
        <option value="Focus">Focus</option>
        <option value="Fusion">Fusion</option>
        <option value="GT">GT</option>
        <option value="Mustang">Mustang</option>
        <option value="Ranger">Ranger</option>
        <option value="Taurus">Taurus</option>
        <option value="Transit Connect">Transit Connect</option>
        <option value="Transit">Transit</option>
      </select>
    </div>
  )
}

const Gmc = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="gmcModels">Model:</label>
      <select id="gmcModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Acadia">Acadia</option>
        <option value="Canyon">Canyon</option>
        <option value="Envoy">Envoy</option>
        <option value="Envoy XL">Envoy XL</option>
        <option value="Envoy XUV">Envoy XUV</option>
        <option value="Jimmy">Jimmy</option>
        <option value="Safari">Safari</option>
        <option value="Savana 1500">Savana 1500</option>
        <option value="Savana 2500">Savana 2500</option>
        <option value="Savana 3500">Savana 3500</option>
        <option value="Sierra 1500">Sierra 1500</option>
        <option value="Sierra 2500HD">Sierra 2500HD</option>
        <option value="Sierra 3500HD">Sierra 3500HD</option>
        <option value="Sonoma">Sonoma</option>
        <option value="Terrain">Terrain</option>
        <option value="TopKick C4500">TopKick C4500</option>
        <option value="Yukon">Yukon</option>
        <option value="Yukon Denali">Yukon Denali</option>
        <option value="Yukon XL">Yukon XL</option>
      </select>
    </div>
  )
}

const Honda = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="hondaModels">Model:</label>
      <select id="hondaModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Accord">Accord</option>
        <option value="Accord Crosstour">Accord Crosstour</option>
        <option value="CR-V">CR-V</option>
        <option value="CR-Z">CR-Z</option>
        <option value="Civic">Civic</option>
        <option value="Civic Hybrid">Civic Hybrid</option>
        <option value="Civic Type R">Civic Type R</option>
        <option value="Clarity Fuel Cell">Clarity Fuel Cell</option>
        <option value="Clarity Plug-In Hybrid">Clarity Plug-In Hybrid</option>
        <option value="Fit">Fit</option>
        <option value="HR-V">HR-V</option>
        <option value="Insight">Insight</option>
        <option value="Odyssey">Odyssey</option>
        <option value="Passport">Passport</option>
        <option value="Pilot">Pilot</option>
        <option value="Ridgeline">Ridgeline</option>
      </select>
    </div>
  )
}

const Hyundai = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="hyundaiModels">Model:</label>
      <select id="hyundaiModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Accent">Accent</option>
        <option value="Azera">Azera</option>
        <option value="Elantra">Elantra</option>
        <option value="Elantra GT">Elantra GT</option>
        <option value="Ioniq Electric">Ioniq Electric</option>
        <option value="Ioniq Hybrid">Ioniq Hybrid</option>
        <option value="Ioniq Plug-In Hybrid">Ioniq Plug-In Hybrid</option>
        <option value="Kona">Kona</option>
        <option value="Nexo">Nexo</option>
        <option value="Palisade">Palisade</option>
        <option value="Santa Fe">Santa Fe</option>
        <option value="Santa Fe Sport">Santa Fe Sport</option>
        <option value="Sonata">Sonata</option>
        <option value="Sonata Hybrid">Sonata Hybrid</option>
        <option value="Tucson">Tucson</option>
        <option value="Venue">Venue</option>
        <option value="Veloster">Veloster</option>
        <option value="Venue">Venue</option>
        <option value="Venue">Venue</option>
      </select>
    </div>
  )
}

const Infiniti = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="infinitiModels">Model:</label>
      <select id="infinitiModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Q50">Q50</option>
        <option value="Q60">Q60</option>
        <option value="Q70">Q70</option>
        <option value="QX30">QX30</option>
        <option value="QX50">QX50</option>
        <option value="QX55">QX55</option>
        <option value="QX60">QX60</option>
        <option value="QX80">QX80</option>
      </select>
    </div>
  )
}

const Jaguar = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="jaguarModels">Model:</label>
      <select id="jaguarModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="E-PACE">E-PACE</option>
        <option value="F-PACE">F-PACE</option>
        <option value="F-TYPE">F-TYPE</option>
        <option value="I-PACE">I-PACE</option>
        <option value="XE">XE</option>
        <option value="XF">XF</option>
        <option value="XJ">XJ</option>
        <option value="XK">XK</option>
      </select>
    </div>
  )
}

const Jeep = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="jeepModels">Model:</label>
      <select id="jeepModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Cherokee">Cherokee</option>
        <option value="Comanche">Comanche</option>
        <option value="Commander">Commander</option>
        <option value="Compass">Compass</option>
        <option value="Gladiator">Gladiator</option>
        <option value="Grand Cherokee">Grand Cherokee</option>
        <option value="Grand Wagoneer">Grand Wagoneer</option>
        <option value="Liberty">Liberty</option>
        <option value="Patriot">Patriot</option>
        <option value="Renegade">Renegade</option>
        <option value="Scrambler">Scrambler</option>
        <option value="Wagoneer">Wagoneer</option>
        <option value="Wrangler">Wrangler</option>
        <option value="Wrangler JK">Wrangler JK</option>
        <option value="Wrangler Unlimited">Wrangler Unlimited</option>
      </select>
    </div>
  )
}

const Kia = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="kiaModels">Model:</label>
      <select id="kiaModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Cadenza">Cadenza</option>
        <option value="Forte">Forte</option>
        <option value="K5">K5</option>
        <option value="K900">K900</option>
        <option value="Niro">Niro</option>
        <option value="Rio">Rio</option>
        <option value="Seltos">Seltos</option>
        <option value="Sorento">Sorento</option>
        <option value="Soul">Soul</option>
        <option value="Sportage">Sportage</option>
        <option value="Stinger">Stinger</option>
        <option value="Telluride">Telluride</option>
      </select>
    </div>
  )
}

const LandRover = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="landRoverModels">Model:</label>
      <select id="landRoverModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Defender">Defender</option>
        <option value="Discovery">Discovery</option>
        <option value="Discovery Sport">Discovery Sport</option>
        <option value="Range Rover">Range Rover</option>
        <option value="Range Rover Evoque">Range Rover Evoque</option>
        <option value="Range Rover Sport">Range Rover Sport</option>
        <option value="Range Rover Velar">Range Rover Velar</option>
      </select>
    </div>
  )
}

const Lexus = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="lexusModels">Model:</label>
      <select id="lexusModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="ES">ES</option>
        <option value="GS">GS</option>
        <option value="GX">GX</option>
        <option value="IS">IS</option>
        <option value="LC">LC</option>
        <option value="LFA">LFA</option>
        <option value="LS">LS</option>
        <option value="LX">LX</option>
        <option value="NX">NX</option>
        <option value="RC">RC</option>
        <option value="RX">RX</option>
        <option value="UX">UX</option>
      </select>
    </div>
  )
}

const Lincoln = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="lincolnModels">Model:</label>
      <select id="lincolnModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Aviator">Aviator</option>
        <option value="Continental">Continental</option>
        <option value="Corsair">Corsair</option>
        <option value="MKC">MKC</option>
        <option value="MKS">MKS</option>
        <option value="MKT">MKT</option>
        <option value="MKX">MKX</option>
        <option value="MKZ">MKZ</option>
        <option value="Nautilus">Nautilus</option>
        <option value="Navigator">Navigator</option>
        <option value="Town Car">Town Car</option>
        <option value="Zephyr">Zephyr</option>
      </select>
    </div>
  )
}

const Mazda = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="mazdaModels">Model:</label>
      <select id="mazdaModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="CX-3">CX-3</option>
        <option value="CX-30">CX-30</option>
        <option value="CX-5">CX-5</option>
        <option value="CX-9">CX-9</option>
        <option value="Mazda2">Mazda2</option>
        <option value="Mazda3">Mazda3</option>
        <option value="Mazda5">Mazda5</option>
        <option value="Mazda6">Mazda6</option>
        <option value="MX-5 Miata">MX-5 Miata</option>
        <option value="MX-5 Miata RF">MX-5 Miata RF</option>
      </select>
    </div>
  )
}

const Mercedes = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="mercedesModels">Model:</label>
      <select id="mercedesModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="A-Class">A-Class</option>
        <option value="C-Class">C-Class</option>
        <option value="CLA">CLA</option>
        <option value="CLS">CLS</option>
        <option value="E-Class">E-Class</option>
        <option value="G-Class">G-Class</option>
        <option value="GLA">GLA</option>
        <option value="GLB">GLB</option>
        <option value="GLC">GLC</option>
        <option value="GLE">GLE</option>
        <option value="GLS">GLS</option>
        <option value="S-Class">S-Class</option>
        <option value="SL">SL</option>
        <option value="SLS AMG">SLS AMG</option>
        <option value="SLC">SLC</option>
        <option value="SLK">SLK</option>
        <option value="SLR McLaren">SLR McLaren</option>
      </select>
    </div>
  )
}

const Mini = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="miniModels">Model:</label>
      <select id="miniModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Clubman">Clubman</option>
        <option value="Convertible">Convertible</option>
        <option value="Countryman">Countryman</option>
        <option value="Coupe">Coupe</option>
        <option value="Hardtop">Hardtop</option>
        <option value="Paceman">Paceman</option>
        <option value="Roadster">Roadster</option>
      </select>
    </div>
  )
}

const Mitsubishi = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="mitsubishiModels">Model:</label>
      <select id="mitsubishiModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="3000GT">3000GT</option>
        <option value="Diamante">Diamante</option>
        <option value="Eclipse">Eclipse</option>
        <option value="Eclipse Cross">Eclipse Cross</option>
        <option value="Endeavor">Endeavor</option>
        <option value="Galant">Galant</option>
        <option value="i-MiEV">i-MiEV</option>
        <option value="Lancer">Lancer</option>
        <option value="Lancer Evolution">Lancer Evolution</option>
        <option value="Mirage">Mirage</option>
        <option value="Mirage G4">Mirage G4</option>
        <option value="Montero">Montero</option>
        <option value="Montero Sport">Montero Sport</option>
        <option value="Outlander">Outlander</option>
        <option value="Outlander PHEV">Outlander PHEV</option>
        <option value="Outlander Sport">Outlander Sport</option>
        <option value="Raider">Raider</option>
        <option value="Sigma">Sigma</option>
        <option value="Space Star">Space Star</option>
        <option value="Space Wagon">Space Wagon</option>
      </select>
    </div>
  )
}

const Nissan = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="nissanModels">Choose a model:</label>
      <select id="nissanModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="350Z">350Z</option>
        <option value="370Z">370Z</option>
        <option value="Altima">Altima</option>
        <option value="Armada">Armada</option>
        <option value="Cube">Cube</option>
        <option value="Frontier">Frontier</option>
        <option value="GT-R">GT-R</option>
        <option value="Juke">Juke</option>
        <option value="Kicks">Kicks</option>
        <option value="Leaf">Leaf</option>
        <option value="Maxima">Maxima</option>
        <option value="Murano">Murano</option>
        <option value="NV200">NV200</option>
        <option value="Pathfinder">Pathfinder</option>
        <option value="Quest">Quest</option>
        <option value="Rogue">Rogue</option>
        <option value="Sentra">Sentra</option>
        <option value="Titan">Titan</option>
        <option value="Versa">Versa</option>
        <option value="Xterra">Xterra</option>
      </select>
    </div>
  )
}

const Porsche = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="porscheModels">Choose a model:</label>
      <select id="porscheModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="718 Cayman">718 Cayman</option>
        <option value="718 Boxster">718 Boxster</option>
        <option value="911">911</option>
        <option value="Panamera">Panamera</option>
        <option value="Macan">Macan</option>
        <option value="Cayenne">Cayenne</option>
        <option value="Taycan">Taycan</option>
        <option value="918 Spyder">918 Spyder</option>
        <option value="Carrera GT">Carrera GT</option>
        <option value="911 GT1">911 GT1</option>
        <option value="959">959</option>
        <option value="944">944</option>
        <option value="928">928</option>
        <option value="914">914</option>
        <option value="356">356</option>
      </select>
    </div>
  )
}

const Subaru = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="subaruModels">Choose a model:</label>
      <select id="subaruModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Ascent">Ascent</option>
        <option value="B9 Tribeca">B9 Tribeca</option>
        <option value="Baja">Baja</option>
        <option value="BRZ">BRZ</option>
        <option value="Crosstrek">Crosstrek</option>
        <option value="Forester">Forester</option>
        <option value="Impreza">Impreza</option>
        <option value="Justy">Justy</option>
        <option value="Legacy">Legacy</option>
        <option value="Outback">Outback</option>
        <option value="SVX">SVX</option>
        <option value="Tribeca">Tribeca</option>
        <option value="WRX">WRX</option>
        <option value="XT">XT</option>
      </select>
    </div>
  )
}

const Tesla = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="teslaModels">Choose a model:</label>
      <select id="teslaModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Model S">Model S</option>
        <option value="Model 3">Model 3</option>
        <option value="Model X">Model X</option>
        <option value="Model Y">Model Y</option>
        <option value="Roadster">Roadster</option>
      </select>
    </div>
  )
}

const Toyota = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="toyotaModels">Choose a model:</label>
      <select id="toyotaModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="4Runner">4Runner</option>
        <option value="86">86</option>
        <option value="Avalon">Avalon</option>
        <option value="C-HR">C-HR</option>
        <option value="Camry">Camry</option>
        <option value="Corolla">Corolla</option>
        <option value="GR Supra">GR Supra</option>
        <option value="Highlander">Highlander</option>
        <option value="Land Cruiser">Land Cruiser</option>
        <option value="Mirai">Mirai</option>
        <option value="Prius">Prius</option>
        <option value="RAV4">RAV4</option>
        <option value="Sequoia">Sequoia</option>
        <option value="Sienna">Sienna</option>
        <option value="Tacoma">Tacoma</option>
        <option value="Tundra">Tundra</option>
        <option value="Venza">Venza</option>
        <option value="Yaris">Yaris</option>
      </select>
    </div>
  )
}

const Volkswagen = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="volkswagenModels">Choose a model:</label>
      <select id="volkswagenModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="Arteon">Arteon</option>
        <option value="Atlas">Atlas</option>
        <option value="Beetle">Beetle</option>
        <option value="CC">CC</option>
        <option value="e-Golf">e-Golf</option>
        <option value="Golf">Golf</option>
        <option value="Jetta">Jetta</option>
        <option value="Passat">Passat</option>
        <option value="Tiguan">Tiguan</option>
        <option value="Touareg">Touareg</option>
      </select>
    </div>
  )
}

const Volvo = ({ onChange }) =>
{
  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor="volvoModels">Choose a model:</label>
      <select id="volvoModels" defaultValue='blank' onChange={ onChange }>
        <option value="blank" disabled></option>
        <option value="C30">C30</option>
        <option value="C70">C70</option>
        <option value="S60">S60</option>
        <option value="S80">S80</option>
        <option value="S90">S90</option>
        <option value="V40">V40</option>
        <option value="V50">V50</option>
        <option value="V60">V60</option>
        <option value="V70">V70</option>
        <option value="V90">V90</option>
        <option value="XC40">XC40</option>
        <option value="XC60">XC60</option>
        <option value="XC70">XC70</option>
        <option value="XC90">XC90</option>
      </select>
    </div>
  )
}

export
{
  Blank,
  Acura,
  AlfaRomeo,
  Audi,
  Bmw,
  Buick,
  Cadillac,
  Chevy,
  Chrysler,
  Dodge,
  Fiat,
  Ford,
  Gmc,
  Honda,
  Hyundai,
  Infiniti,
  Jaguar,
  Jeep,
  Kia,
  LandRover,
  Lexus,
  Lincoln,
  Mazda,
  Mercedes,
  Mini,
  Mitsubishi,
  Nissan,
  Porsche,
  Subaru,
  Tesla,
  Toyota,
  Volkswagen,
  Volvo
}