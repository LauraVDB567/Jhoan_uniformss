import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // ✅ Importando Bar
import Chart from 'chart.js/auto';

const DevolucionesGrafica = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Hacer la solicitud GET a la nueva ruta para obtener devoluciones
    fetch('http://localhost:5013/api/devoluciones')
      .then((response) => response.json())
      .then((data) => {
        console.log('✅ Datos recibidos de la API:', data);
        setDevoluciones(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error('❌ Error al obtener las devoluciones:', error);
        setCargando(false);
      });
  }, []);

  // Contar las devoluciones por fecha
  const devolucionesPorFecha = devoluciones.reduce((acc, curr) => {
    if (!curr.fecha) return acc;
    const fechaFormateada = new Date(curr.fecha).toLocaleDateString();
    acc[fechaFormateada] = (acc[fechaFormateada] || 0) + 1; // Contar devoluciones (cada devolución se cuenta como 1)
    return acc;
  }, {});

  const labels = Object.keys(devolucionesPorFecha);
  const values = Object.values(devolucionesPorFecha);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Devoluciones por Fecha',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 30,  // Ajuste de grosor de las barras
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Devoluciones por Fecha' },
    },
    scales: {
      x: {
        title: { display: true, text: 'Fecha' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad' },
        ticks: {
          stepSize: 1, // Devoluciones contadas de 1 en 1
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '36px' }}>Gráfica de Devoluciones por Fecha</h2>
      {cargando ? (
        <p style={{ fontSize: '24px', textAlign: 'center' }}>Cargando datos...</p>
      ) : labels.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p style={{ fontSize: '24px', textAlign: 'center' }}>No hay datos para mostrar en la gráfica.</p>
      )}
    </div>
  );
};

export default DevolucionesGrafica;
