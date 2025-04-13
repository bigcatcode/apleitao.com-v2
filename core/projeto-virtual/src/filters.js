import React from 'react';
import TaxonomyFilter from './TaxonomyFilter';

function MarcaFilter({ onChange }) {
  return (
    <div>
      <div className="filter-label font-poppins px-[28px]">Marca</div>
      <TaxonomyFilter taxonomy="marca" layout="one-column" onChange={onChange} />
    </div>
  );
}

function CorFilter({ onChange }) {
  return (
    <div>
      <div className="filter-label font-poppins px-[28px]">Cor</div>
      <TaxonomyFilter taxonomy="cor" layout="two-column" onChange={onChange} />
    </div>
  );
}

function AcabamentoFilter({ onChange }) {
  return (
    <div>
      <div className="filter-label font-poppins px-[28px]">Acabamento</div>
      <TaxonomyFilter taxonomy="acabamento" layout="one-column" onChange={onChange} />
    </div>
  );
}

function EstiloFilter({ onChange }) {
  return (
    <div>
      <div className="filter-label font-poppins px-[28px]">Estilo</div>
      <TaxonomyFilter taxonomy="estilo" layout="one-column" onChange={onChange} />
    </div>
  );
}

export { MarcaFilter, CorFilter, AcabamentoFilter, EstiloFilter };
