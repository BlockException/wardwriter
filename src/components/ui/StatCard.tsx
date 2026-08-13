import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  isMain?: boolean;
  isHidden?: boolean;
}

export default function StatCard({ label, value, isMain = false, isHidden = false }: StatCardProps) {
  return (
    <div className={`${styles.stat} ${isMain ? styles.mainStat : ''} ${isHidden ? styles.hidden : ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
