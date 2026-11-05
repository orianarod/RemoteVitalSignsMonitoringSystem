# Remote Vital Signs Monitoring System with Geolocation

This project is the web server component of a remote vital signs monitoring system developed as part of a Telecommunications Engineering bachelor's thesis at Universidad Católica Andrés Bello.

The system was designed to support remote monitoring of patients with cardiovascular conditions by collecting vital sign measurements, managing patient records, and notifying administrators when potential medical emergencies are detected.

## Web Application Features

- **Patient Management:** Register, view, filter, and manage patient records.
- **Vital Signs Monitoring:** Receive, process, store, and display patient measurements, including heart rate, blood pressure, and body temperature.
- **User Authentication:** Login system with role-based access for administrators and patients.
- **Emergency Alerts:** Automatically register alerts when abnormal measurements are received, using MySQL triggers.
- **Geolocation:** Display the patient's location through Google Maps links when an emergency alert is generated.
- **Data Processing:** Receive measurement data through HTTP POST requests, process incoming parameters, and store records in the database.

## Technologies Used

- PHP
- MySQL / MariaDB
- XAMPP
- Apache
- SQL

## System Architecture

The web server consists of two main components:

1. **Data Reception:** A PHP backend application that receives HTTP POST requests, processes incoming patient data, and inserts the measurements into the database.
2. **Monitoring Application:** A web application with separate administrator and patient interfaces, allowing users to access information according to their assigned roles.

The original system also included an Arduino-based monitoring device with vital sign sensors and GPS/GSM communication, as well as an Android device running SMS Forwarder to relay incoming messages to the web server.

**Note:** This repository contains only the web server source code. The Arduino firmware and Android SMS Forwarder configuration are not included.
