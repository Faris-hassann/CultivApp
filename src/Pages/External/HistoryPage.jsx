import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Typography,
  Chip,
  Collapse,
  Box,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  CheckCircle,
  AccessTime,
  Cancel,
} from "@mui/icons-material";

const mockForms = [
  // ... same mockForms as before
];

const statusMap = {
  approved: {
    label: "Approved",
    icon: <CheckCircle fontSize="small" color="success" />,
    color: "success",
  },
  pending: {
    label: "Pending",
    icon: <AccessTime fontSize="small" sx={{ color: '#facc15' }} />,
    color: "warning",
  },
  rejected: {
    label: "Rejected",
    icon: <Cancel fontSize="small" color="error" />,
    color: "error",
  },
};

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

function getCurrentStatus(form) {
  if (form.status === "approved") return "Approved";
  if (form.status === "rejected") return "Rejected";
  const next = form.approvals.find((a) => a.status === "pending");
  if (next) return `Waiting for ${next.level} Approval`;
  return "Submitted";
}

const HistoryPage = () => {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const filteredForms =
    filter === "all"
      ? mockForms
      : mockForms.filter((f) => f.status === filter);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Service Form History
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={3} flexWrap="wrap">
        {filterOptions.map((opt) => (
          <Button
            key={opt.value}
            variant={filter === opt.value ? "contained" : "outlined"}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Form Type</TableCell>
              <TableCell>Date Submitted</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Approval History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredForms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    No forms found for this filter.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredForms.map((form) => (
                <React.Fragment key={form.id}>
                  <TableRow
                    hover
                    onClick={() =>
                      setExpanded(expanded === form.id ? null : form.id)
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{form.type}</TableCell>
                    <TableCell>{form.dateSubmitted}</TableCell>
                    <TableCell>
                      <Chip
                        icon={statusMap[form.status].icon}
                        label={statusMap[form.status].label}
                        color={statusMap[form.status].color}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {getCurrentStatus(form)}
                        {expanded === form.id ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expanded === form.id} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                          <Typography variant="subtitle1" gutterBottom>
                            Approval Timeline
                          </Typography>
                          <ul>
                            {form.approvals.map((a, idx) => (
                              <li key={idx} style={{ marginBottom: "1rem" }}>
                                <Typography variant="body2">
                                  {a.status === "approved" && (
                                    <>
                                      Approved by <strong>{a.by}</strong> on {a.date}
                                    </>
                                  )}
                                  {a.status === "pending" && (
                                    <>
                                      Waiting for <strong>{a.level}</strong> Approval
                                    </>
                                  )}
                                  {a.status === "rejected" && (
                                    <>
                                      Rejected by <strong>{a.by}</strong> on {a.date}
                                    </>
                                  )}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {a.level} — Reason: {a.justification}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryPage;
