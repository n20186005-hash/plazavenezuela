export function weatherURL(lat: number, lon: number) {
  const query = new URLSearchParams({ latitude: String(lat), longitude: String(lon), current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m', daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,uv_index_max,sunrise,sunset', timezone: 'America/Caracas', forecast_days: '7', wind_speed_unit: 'kmh' });
  return 'https://api.open-meteo.com/v1/forecast?' + query;
}
type Day = { date: string; high: number; low: number; rain: number; code: number; uv: number; sunrise: string; sunset: string };
export type WeatherData = { time: string; temp: number; feels: number; humidity: number; wind: number; code: number; days: Day[] };
const stamp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
export function parseWeather(raw: any): WeatherData {
  const c = raw?.current, d = raw?.daily;
  if (!c || !stamp.test(c.time) || ![c.temperature_2m, c.apparent_temperature, c.relative_humidity_2m, c.wind_speed_10m, c.weather_code].every(Number.isFinite) || !Array.isArray(d?.time) || !d.time.length) throw Error('Weather unavailable');
  const days: Day[] = d.time.slice(0, 7).map((date: string, i: number) => {
    const values = [d.temperature_2m_max?.[i], d.temperature_2m_min?.[i], d.precipitation_probability_max?.[i], d.weather_code?.[i], d.uv_index_max?.[i]];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !values.every(Number.isFinite)) throw Error('Forecast unavailable');
    const time = (s: unknown) => typeof s === 'string' && stamp.test(s) ? s.slice(11) : '—';
    return { date, high: values[0], low: values[1], rain: values[2], code: values[3], uv: values[4], sunrise: time(d.sunrise?.[i]), sunset: time(d.sunset?.[i]) };
  });
  return { time: c.time, temp: c.temperature_2m, feels: c.apparent_temperature, humidity: c.relative_humidity_2m, wind: c.wind_speed_10m, code: c.weather_code, days };
}
export function condition(code: number): [string, string] {
  if (code === 0) return ['☀', 'Despejado'];
  if (code <= 3 && code >= 1) return ['☁', 'Nuboso'];
  if ([45, 48].includes(code)) return ['🌫', 'Niebla'];
  if ([51, 53, 55, 56, 57].includes(code)) return ['🌦', 'Llovizna'];
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return ['🌧', 'Lluvia'];
  if ([71, 73, 75, 77, 85, 86].includes(code)) return ['❄', 'Nieve'];
  if ([95, 96, 99].includes(code)) return ['⛈', 'Tormenta'];
  return ['🌡', 'Condición no identificada'];
}
export function advice(w: WeatherData) {
  const tips = ['Lleva agua y adapta las pausas a tus necesidades.'];
  if (w.temp >= 30 || w.days[0].high >= 30) tips.push('Si hace calor, reduce la exposición prolongada y busca sombra disponible.');
  if (w.days[0].uv >= 5) tips.push('El UV previsto es elevado: prepara protección solar y evita la exposición prolongada.');
  if (w.days[0].rain >= 40 || [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(w.code)) tips.push('Lleva protección para la lluvia y calzado con agarre; comprueba el estado del suelo.');
  if ([95, 96, 99].includes(w.code)) tips.push('Con tormenta, aplaza la visita al aire libre y aléjate del agua y de puntos expuestos.');
  if (w.wind >= 29) tips.push('Con viento fuerte, reduce la exposición y protege los objetos sueltos.');
  if (w.days[0].low <= 16) tips.push('Una capa adicional puede resultar útil en las horas más frescas.');
  tips.push('La previsión no confirma la operación de la fuente ni la apertura de otros destinos.');
  return tips;
}
export function renderWeather(w: WeatherData) {
  const n = (v: number) => new Intl.NumberFormat('es-VE', { maximumFractionDigits: 1 }).format(v);
  const [icon, label] = condition(w.code);
  const rows = w.days.map(d => {
    const [glyph, text] = condition(d.code), date = new Intl.DateTimeFormat('es-VE', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(d.date + 'T12:00:00Z'));
    return `<tr><th scope="row">${date}</th><td>${glyph} ${text}</td><td>${n(d.high)}° / ${n(d.low)}°</td><td>${n(d.rain)}%</td><td>${n(d.uv)}</td><td>${d.sunrise} / ${d.sunset}</td></tr>`;
  }).join('');
  return `<p class="pv-weather-time">Hora del dato: ${w.time.replace('T', ' ')} · America/Caracas. No es una medición de la plaza.</p><div class="pv-weather-now"><span aria-hidden="true">${icon}</span><strong>${n(w.temp)} °C</strong><p>${label} · Sensación ${n(w.feels)} °C</p><p>Humedad ${n(w.humidity)}% · Viento ${n(w.wind)} km/h</p></div><div class="pv-weather-advice"><h3>Preparación para la visita</h3><ul>${advice(w).map(t => `<li>${t}</li>`).join('')}</ul></div><div class="pv-weather-scroll" tabindex="0" role="region" aria-label="Tabla de previsión desplazable"><table class="pv-weather-table"><caption>Previsión diaria · hasta siete días</caption><thead><tr><th scope="col">Día</th><th scope="col">Tiempo</th><th scope="col">Máxima / mínima</th><th scope="col">Lluvia</th><th scope="col">UV</th><th scope="col">Salida / puesta del sol</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
