import React from 'react';
import TaxonomyFilter from './TaxonomyFilter'; // Импортируем компонент TaxonomyFilter

function MarcaFilter() {
    return (
        <div>
        <div className="filter-label font-poppins px-[28px]">Marca</div>
        <TaxonomyFilter taxonomy="marca" layout="one-column" />
        </div>
    );
}

function CorFilter() {;
    return (
        <div>
            <div className="filter-label font-poppins px-[28px]">Cor</div>
            <TaxonomyFilter taxonomy="cor" layout="two-column" />
        </div>
    );
}

function AcabamentoFilter() {
    return (
        <div>
            <div className="filter-label font-poppins px-[28px]">Acabamento</div>
            <TaxonomyFilter taxonomy="acabamento" layout="one-column" />
        </div>
    );
}

function EstiloFilter() {
    return (
        <div>
            <div className="filter-label font-poppins px-[28px]">Estilo</div>
            <TaxonomyFilter taxonomy="estilo" layout="one-column" />
        </div>
    );
}

export { MarcaFilter, CorFilter, AcabamentoFilter, EstiloFilter };
