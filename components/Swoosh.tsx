/**
 * Vagues turquoise reprises de la carte de visite AQDOULUM.
 * Les bandes partent d'une courbe et remplissent le côté droit,
 * jusqu'au panneau sombre final.
 */
export default function Swoosh({ className = "swoosh", dark = "#0e2a3b" }: { className?: string; dark?: string }) {
  const band = (o: number) => `M${120 + o} 0 C ${270 + o} 90 ${300 + o} 270 ${150 + o} 400 L600 400 L600 0 Z`;
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
      <path d={band(0)} fill="#1fbdc6" />
      <path d={band(46)} fill="#199fa8" />
      <path d={band(92)} fill="#0f8890" />
      <path d={band(150)} fill={dark} />
    </svg>
  );
}
