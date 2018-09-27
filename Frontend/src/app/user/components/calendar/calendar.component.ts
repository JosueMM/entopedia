
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../services/calendar.service';
import { CalendarEventDB } from '../../../event';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {

  closeResult: string;
  calednarEvent: CalendarEventDB[];
  current_event: CalendarEventDB;
  eventosCalentario: CalendarEvent[];
  evento: CalendarEvent;

  db_start: Date;
  db_end: Date;
  db_title: string;
  logeado: JSON;
  db_color: string;
  admin:boolean;


  operation = { is_new: true };

  ngOnInit() {
    let token = sessionStorage.getItem("token");
if(token == undefined ){
  this.router.navigateByUrl('/login');
}
    this.calednarEvent = [];
    this.current_event = new CalendarEventDB();
    this.getCalendar();
    this.admin = this.isAdmi();
   


  }

  isAdmi() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let is_admi = user.is_admi;
    
    if (is_admi === 1) {
      return true;
    } else {
      return false;
    }
  }


  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private calendarService: CalendarService, private router : Router) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;


      }
    }
  }



  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.evento = event;

    this.modal.open(this.modalContent, { size: 'lg' });

  }



  addEvent(): void {

    this.evento =
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true


      }
    this.events.unshift(this.evento);
    this.refresh.next();
  }

  editCalendar(evnets: CalendarEventDB) {
    this.current_event = evnets;
    this.operation.is_new = false;
  }

  getCalendar() {
    this.calendarService.getCalendar()
      .subscribe(calednarEvent => {
        this.calednarEvent = calednarEvent.json();
        this.calendario();
      });
  }

  addCalendar() {

    this.current_event.title = this.evento.title;
    this.current_event.startevent = this.evento.start.toString();
    this.current_event.endevent = this.evento.end.toString();
    this.current_event.color = this.evento.color.primary.toString();


    this.calendarService.addCalendar(this.current_event)
      .subscribe(res => {
        this.operation.is_new = false;
        this.current_event = new CalendarEventDB();
        alert("Evento Guardado");
        this.ngOnInit();
      });

  }

  updateCalendar() {
    this.calendarService.updateCalendar(this.current_event)
      .subscribe(res => {
        this.current_event = new CalendarEventDB();
        this.operation.is_new = true;
        this.ngOnInit();
      });

  }

  deleteCalendar(id: number) {
    this.calendarService.deleteCalendar(id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }

  calendario() {
    this.events = [];
    for (let i = 0; i < this.calednarEvent.length; i++) {

      this.evento =
        {
          id: this.calednarEvent[i].id,
          title: this.calednarEvent[i].title,
          start: startOfDay(new Date(this.calednarEvent[i].startevent)),
          end: endOfDay(new Date(this.calednarEvent[i].endevent)),
          color: colors.red,
          draggable: false

        }

      this.events.push(this.evento);

      this.refresh.next();

    }

  }


}
