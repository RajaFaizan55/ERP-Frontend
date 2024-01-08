import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

import CardContainer from 'components/card-container';
import MobileButton from 'components/button/mobile-button';
import DeletePopup from 'components/delete-modal';
import NavLinks from 'components/nav-links';
import style from './calender.module.scss';
import ViewRecords from './view-records';
import Loading from 'components/loading';
import Button from 'components/button';
import AddEvent from './add-events';

import { Employee } from 'interfaces/employee';
import EmployeeService from 'services/employee-service';
import CalenderService from 'services/calender-service';

import plusIcon from 'assets/mobile-view/plusIcon.svg';
import addSvg from 'assets/logo5.svg';
import './calender.css';
import moment from 'moment';

const Calender = () => {
  const { currentUser } = useAppSelector((state) => state.app);

  const [currentStartDate, setCurrentStartDate] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentEventId, setCurrentEventId] = useState('');
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [calenderEvents, setCalenderEvents] = useState();
  const [updateEventId, setUpdateEventId] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [eventData, setEventData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getEmployeeIds = async () => {
      setLoading(true);

      const res = await EmployeeService.getAllEmployees();
      if (res.status === 200) {
        const ids: any[] = [];
        const optionArr: any[] = [];
        res.data.employees.forEach((employee: Employee) => {
          const { name, employeeId, email, name2 } = employee;
          optionArr.push({
            label: name2,
            value: { name, employeeId, email },
          });
          ids.push({
            name,
            employeeId,
            email,
          });
          setLoading(false);
        });
        setOptions(optionArr);
      }
    };

    currentUser?.role !== 'Employee' && getEmployeeIds();
  }, [calenderEvents]);

  const handleAllEvents = async (e?: any) => {
    setLoading(true);
    const res = await CalenderService.getAllEvents({
      date: moment(e?.startStr || currentStartDate).format('YYYY-MM-DD'),
    });
    setCalenderEvents(res.data.events);
    setLoading(false);
  };

  const deleteEvent = async () => {
    setDeleteLoader(true);
    const res = await CalenderService.deleteEvent(currentEventId);
    if (res.status === 200) {
      setDeleteLoader(false);
      setDeleteModalOpen(false);
      setIsOpen(false);
      handleAllEvents();
    }
  };

  return (
    <>
      <CardContainer>
        <NavLinks links={[{ title: 'Events Calender', left: '31px' }]} />
        {loading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}
        <div style={{ zIndex: '1' }}>
          <FullCalendar
            viewClassNames={'fc'}
            headerToolbar={{
              left: 'prev,next,today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              momentTimezonePlugin,
            ]}
            initialView="dayGridMonth"
            timeZone={'UTC'}
            events={calenderEvents}
            eventBackgroundColor={'rgb(87, 185, 147)'}
            eventBorderColor={'rgb(87, 185, 147)'}
            showNonCurrentDates={false}
            fixedWeekCount={false}
            dayMaxEventRows={2}
            eventClick={(e) => {
              setCurrentEventId(e?.event?._def?.extendedProps?._id);
              setIsOpen(true);
              setEventData(e.event._def);
            }}
            datesSet={(e: any) => {
              setCurrentStartDate(e?.startStr);
              handleAllEvents(e);
            }}
          />
        </div>

        <div>
          {currentUser?.role !== 'Employee' && (
            <>
              <div className={style.addBtnDiv}>
                <div className={style.addBtnChildDiv}>
                  <Button
                    text="Add Event"
                    btnClass={style.zIndex}
                    icon={addSvg}
                    handleClick={() => {
                      setOpen(true);
                    }}
                  />
                </div>
              </div>

              <div>
                <MobileButton
                  btnClass={style.zIndex}
                  mobileIcon={plusIcon}
                  handleClick={() => {
                    setOpen(true);
                  }}
                />
              </div>
            </>
          )}
        </div>
        <ViewRecords
          open={isOpen}
          setOpen={setIsOpen}
          eventData={eventData}
          setOpenEditModal={setOpen}
          setOpenDelete={setDeleteModalOpen}
          setUpdateEventId={setUpdateEventId}
        />
      </CardContainer>

      {open && (
        <AddEvent
          open={open}
          setOpen={setOpen}
          options={options}
          eventData={eventData}
          setIsOpen={setIsOpen}
          getEventData={handleAllEvents}
          updateEventId={updateEventId}
          setUpdateEventId={setUpdateEventId}
        />
      )}

      {deleteModalOpen && (
        <DeletePopup
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          handleDelete={() => {
            deleteEvent();
          }}
          btnLoader={deleteLoader}
        />
      )}
    </>
  );
};

export default Calender;

export interface Option {
  label: string;
  value: { name: string; email: string; employeeId: string };
}
