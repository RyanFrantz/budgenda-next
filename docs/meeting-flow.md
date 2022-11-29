# Meeting Flow

Describe how a user experiences support for meetings.

```mermaid
  flowchart TD
    A[User visits /meeting/1234] --> B{Is meeting 1234 available?}
    B -- Yes --> C[Retrieve meeting contents and display]
    B -- No --> D[Prompt user with options]
    D --> E{Start adhoc meeting?}
    E -- Click --> F[Redirect user to /meeting]
    D --> G{Schedule future meeting?}
    G -- Click --> H[Redirect user to /schedule]
    D --> I{Select previously scheduled meeting?}
    I -- Click --> J[Present user with list of scheduled meetings]
    J --> K{User selects scheduled meeting?}
    K -- Yes --> L["Redirect user to /meeting/[id]"]
```
