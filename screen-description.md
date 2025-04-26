# Car Tracking App - Technician Features - Screen Descriptions

This document outlines the features available to technicians who manage and assign GPS tracking devices to cars within the application. It details the purpose of each feature and the corresponding screen where it is accessed.

| # | Feature                  | Screen           | Description                                                      |
|---|--------------------------|------------------|------------------------------------------------------------------|
| 1 | Login                    | Login Screen     | Allows the technician to log in to the tracking system.          |
| 2 | View detail gps device   | Home Screen      | Displays detailed information about a specific GPS tracking device. |
| 3 | Unassign device          | Home Screen      | Removes the assignment of a GPS device from a car.               |
| 4 | Get List car for staff   | List Cars Screen | Retrieves and displays a list of cars with 'pending' and 'maintain' status for staff management. |
| 5 | Assign device to car     | List Cars Screen | Assigns a specific GPS tracking device to a designated car.      |



### 3.35.1 Login

**Function Trigger:** When the technician enters their credentials and clicks the "Login" button on the Login Screen.

**Function Description:**

*   **Actors:** Technician
*   **Purpose:** To allow the technician to log in to the tracking system.
*   **Interface:** Login Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the technician's username/email and password from the Login Screen.
    *   **Data Computation:** Authenticates the technician's credentials against the stored user data (e.g., compares the entered password to a stored hashed password).
    *   **Data Binding:** On successful authentication, redirects the technician to the Home Screen (or another designated screen). On failed authentication, displays an error message.
*   **Function Details:** Technician gets access.

### 3.35.2 View detail gps device

**Function Trigger:** When the technician clicks on a specific GPS device listing on the Home Screen.

**Function Description:**

*   **Actors:** Technician
*   **Purpose:** To display detailed information about a specific GPS tracking device.
*   **Interface:** Home Screen (leading to a "GPS Device Detail Screen" or a modal window)
*   **Data Processing:**

    *   **Data Collect:** Collects the GPS device's unique ID. Retrieves the device's details from the database using the ID (e.g., serial number, status, battery level, last known location, assigned car).
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays all relevant information about the GPS device on the Home Screen (or a separate detail screen/modal).
*   **Function Details:** Details of GPS tracking.

### 3.35.3 Unassign device

**Function Trigger:** When the technician clicks the "Unassign Device" button on the Home Screen (likely near the GPS device details or on a dedicated "GPS Device Detail Screen").

**Function Description:**

*   **Actors:** Technician
*   **Purpose:** To remove the assignment of a GPS device from a car.
*   **Interface:** Home Screen (or a "GPS Device Detail Screen")
*   **Data Processing:**

    *   **Data Collect:** Collects the GPS device's unique ID.
    *   **Data Computation:** No significant computation is needed, although a confirmation prompt might appear.
    *   **Data Storage:** Updates the GPS device's record in the database to remove the association with the car.
*   **Function Details:** Remove device to specific car.

### 3.35.4 Get List car for staff

**Function Trigger:** When the technician navigates to the "List Cars Screen".

**Function Description:**

*   **Actors:** Technician
*   **Purpose:** To retrieve and display a list of cars with 'pending' and 'maintain' status for staff management (presumably for assigning GPS devices).
*   **Interface:** List Cars Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of cars from the database.
    *   **Data Computation:** Filters the list to include only cars with a status of "pending" or "maintain".
    *   **Data Binding:** Displays the filtered list of cars on the List Cars Screen, including relevant information (e.g., car model, registration number, status).
*   **Function Details:** Display cars for manage.

### 3.35.5 Assign device to car

**Function Trigger:** When the technician selects a GPS device and a car on the "List Cars Screen" and clicks the "Assign Device" button.

**Function Description:**

*   **Actors:** Technician
*   **Purpose:** To assign a specific GPS tracking device to a designated car.
*   **Interface:** List Cars Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the GPS device's unique ID and the car's unique ID.
    *   **Data Computation:** No significant computation is needed, but the system should verify that the device is not already assigned to another car.
    *   **Data Storage:** Updates the GPS device's record in the database to associate it with the car. Updates the car's record to indicate that a GPS device has been assigned.
*   **Function Details:** Link device to the car.

