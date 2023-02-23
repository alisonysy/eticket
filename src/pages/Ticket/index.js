import styles from "./index.module.css";
import Ticket from '@/components/Ticket'

export default function TicketPage() {
  return <div className={styles.container}>
        <Ticket />
  </div>
}